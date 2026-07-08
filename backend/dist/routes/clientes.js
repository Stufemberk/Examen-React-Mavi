"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../config/database"));
const router = (0, express_1.Router)();
// Validar formato de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// GET /api/clientes - Listar todos los clientes
router.get("/", async (_req, res) => {
    try {
        const clientes = await database_1.default.cliente.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(clientes);
    }
    catch (error) {
        console.error("Error al obtener clientes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
// GET /api/clientes/:id - Obtener un cliente por ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await database_1.default.cliente.findUnique({
            where: { id: Number(id) },
        });
        if (!cliente) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        res.json(cliente);
    }
    catch (error) {
        console.error("Error al obtener cliente:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
// POST /api/clientes - Crear un nuevo cliente
router.post("/", async (req, res) => {
    try {
        const { nombre_completo, email, telefono, empresa } = req.body;
        // Validaciones
        const errors = [];
        if (!nombre_completo || nombre_completo.trim() === "") {
            errors.push("El campo 'nombre_completo' es requerido");
        }
        if (!email || email.trim() === "") {
            errors.push("El campo 'email' es requerido");
        }
        else if (!isValidEmail(email)) {
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
        const existingCliente = await database_1.default.cliente.findUnique({
            where: { email },
        });
        if (existingCliente) {
            res.status(409).json({ errors: ["Ya existe un cliente con ese email"] });
            return;
        }
        const cliente = await database_1.default.cliente.create({
            data: {
                nombre_completo: nombre_completo.trim(),
                email: email.trim(),
                telefono: telefono ? telefono.trim() : null,
                empresa: empresa.trim(),
            },
        });
        res.status(201).json(cliente);
    }
    catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
// PUT /api/clientes/:id - Actualizar un cliente
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_completo, email, telefono, empresa } = req.body;
        // Verificar que el cliente existe
        const existingCliente = await database_1.default.cliente.findUnique({
            where: { id: Number(id) },
        });
        if (!existingCliente) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        // Validaciones
        const errors = [];
        if (!nombre_completo || nombre_completo.trim() === "") {
            errors.push("El campo 'nombre_completo' es requerido");
        }
        if (!email || email.trim() === "") {
            errors.push("El campo 'email' es requerido");
        }
        else if (!isValidEmail(email)) {
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
            const emailTaken = await database_1.default.cliente.findUnique({
                where: { email },
            });
            if (emailTaken) {
                res.status(409).json({ errors: ["Ya existe un cliente con ese email"] });
                return;
            }
        }
        const cliente = await database_1.default.cliente.update({
            where: { id: Number(id) },
            data: {
                nombre_completo: nombre_completo.trim(),
                email: email.trim(),
                telefono: telefono ? telefono.trim() : null,
                empresa: empresa.trim(),
            },
        });
        res.json(cliente);
    }
    catch (error) {
        console.error("Error al actualizar cliente:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
// DELETE /api/clientes/:id - Eliminar un cliente
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const existingCliente = await database_1.default.cliente.findUnique({
            where: { id: Number(id) },
        });
        if (!existingCliente) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        await database_1.default.cliente.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Cliente eliminado correctamente" });
    }
    catch (error) {
        console.error("Error al eliminar cliente:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.default = router;
//# sourceMappingURL=clientes.js.map