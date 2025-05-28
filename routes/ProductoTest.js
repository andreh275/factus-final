import { Router } from "express";
import { crearProductoTest, obtenerProductosTest } from '../controllers/ProductoTest.js';

const router = Router();

// Middleware para registrar solicitudes
router.use((req, res, next) => {
  console.log(`[ProductoTest] ${req.method} ${req.url}`, req.body);
  next();
});

// Rutas para productos de prueba
router.get("/", obtenerProductosTest);
router.post("/", crearProductoTest);

export default router;