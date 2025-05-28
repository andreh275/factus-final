import { Router } from "express";
import { 
    getUsuarios, 
    postUsuarios, 
    getUsuario, 
    putUsuarios, 
    updateUsuario, 
    deleteUsuario 
} from '../controllers/Usuarios.js';
import UsuariosModel from '../models/Usuarios.js';

const router = Router();

// Rutas para usuarios
router.get("/users", getUsuarios);
router.get("/:id", getUsuario);
router.post("/", postUsuarios);
router.put("/:id", putUsuarios);
router.patch("/:id", updateUsuario);
router.delete("/:id", deleteUsuario);

// Ruta alternativa para eliminar usando POST
router.post("/eliminar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Intentando eliminar usuario con ID: ${id}`);
    
    const usuario = await UsuariosModel.findByIdAndDelete(id);
    
    if (!usuario) {
      console.log(`Usuario con ID ${id} no encontrado`);
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    console.log(`Usuario con ID ${id} eliminado correctamente`);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.log(`Error al eliminar usuario: ${error.message}`);
    res.status(400).json({ message: "Error al eliminar el usuario" });
  }
});

export default router;
