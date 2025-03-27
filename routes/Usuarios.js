import { Router } from "express";
import {getUsuarios ,postUsuarios} from '../controllers/Usuarios.js'


const router =Router();

router.post("/", [] , postUsuarios);
router.get("/users", getUsuarios)



export default router