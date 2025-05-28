import { Router } from "express";
import { 
  getProductosyServicios, 
  postProductosyServicios, 
  updateProducto, 
  deleteProducto 
} from '../controllers/ProductosyServicios.js';

const router = Router();

// Middleware para registrar solicitudes
router.use((req, res, next) => {
  console.log(`[Productos] ${req.method} ${req.url}`, req.body);
  next();
});

// Rutas para productos
router.get("/", getProductosyServicios);
router.post("/", postProductosyServicios);
router.post("/:id", updateProducto);
router.delete("/:id", deleteProducto);

export default router;
