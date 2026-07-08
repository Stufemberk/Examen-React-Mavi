import { Router, Request, Response } from "express";
import prisma from "../config/database";

const router = Router();

// Validar formato de email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// GET /api/clientes - Listar todos los clientes
router.get("/", async (_req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(clientes);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// GET /api/clientes/:id - Obtener un cliente por ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
    });

    if (!cliente) {
      res.status(404).json({ error: "Cliente no encontrado" });
      return;
    }

    res.json(cliente);
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// POST /api/clientes - Crear un nuevo cliente
router.post("/", async (req: Request, res: Response) => {
  try {
    const { nombre_completo, email, telefono, empresa } = req.body;

    // Validaciones
    const errors: string[] = [];

    if (!nombre_completo || nombre_completo.trim() === "") {
      errors.push("El campo 'nombre_completo' es requerido");
    }
    if (!email || email.trim() === "") {
      errors.push("El campo 'email' es requerido");
    } else if (!isValidEmail(email)) {
      errors.push("El formato del email no es válido");
    }
    if (!empresa || empresa.trim() === "") {
      errors.push("El campo 'empresa' es requerido");
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    // Verificar si el email ya existe
    const existingCliente = await prisma.cliente.findUnique({
      where: { email },
    });

    if (existingCliente) {
      res.status(409).json({ errors: ["Ya existe un cliente con ese email"] });
      return;
    }

    const cliente = await prisma.cliente.create({
      data: {
        nombre_completo: nombre_completo.trim(),
        email: email.trim(),
        telefono: telefono ? telefono.trim() : null,
        empresa: empresa.trim(),
      },
    });

    res.status(201).json(cliente);
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// PUT /api/clientes/:id - Actualizar un cliente
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre_completo, email, telefono, empresa } = req.body;

    // Verificar que el cliente existe
    const existingCliente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCliente) {
      res.status(404).json({ error: "Cliente no encontrado" });
      return;
    }

    // Validaciones
    const errors: string[] = [];

    if (!nombre_completo || nombre_completo.trim() === "") {
      errors.push("El campo 'nombre_completo' es requerido");
    }
    if (!email || email.trim() === "") {
      errors.push("El campo 'email' es requerido");
    } else if (!isValidEmail(email)) {
      errors.push("El formato del email no es válido");
    }
    if (!empresa || empresa.trim() === "") {
      errors.push("El campo 'empresa' es requerido");
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    // Verificar si el email ya existe en otro cliente
    if (email !== existingCliente.email) {
      const emailTaken = await prisma.cliente.findUnique({
        where: { email },
      });

      if (emailTaken) {
        res.status(409).json({ errors: ["Ya existe un cliente con ese email"] });
        return;
      }
    }

    const cliente = await prisma.cliente.update({
      where: { id: Number(id) },
      data: {
        nombre_completo: nombre_completo.trim(),
        email: email.trim(),
        telefono: telefono ? telefono.trim() : null,
        empresa: empresa.trim(),
      },
    });

    res.json(cliente);
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// DELETE /api/clientes/:id - Eliminar un cliente
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingCliente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCliente) {
      res.status(404).json({ error: "Cliente no encontrado" });
      return;
    }

    await prisma.cliente.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
