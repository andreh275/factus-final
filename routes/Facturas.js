import { Router } from "express";
import { postFacturas, getFacturas, getFactura } from "../controllers/Facturas.js"; 

const router =Router();

router.get("/", getFactura);
router.post("/", postFacturas);
router.get("/bills", getFacturas);


export default router