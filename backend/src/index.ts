import cors from "cors";
import "dotenv/config";
import express from "express";
import clientesRouter from "./routes/clientes";

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/clientes", clientesRouter);

// Ruta de health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "OK", message: "Servidor funcionando correctamente" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
