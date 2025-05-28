import UsuariosModel from '../models/Usuarios.js'

// Controlador para obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuariosModel.find();
        console.log("Usuarios encontrados:", usuarios.length);
        res.json({ usuarios });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error al obtener los usuarios" });
    }
};

// Controlador para crear un nuevo usuario
export const postUsuarios = async (req, res) => {
    try {
        const usuario = new UsuariosModel(req.body);
        await usuario.save();
        res.status(201).json({ mensaje: "Usuario creado correctamente", usuario });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error al crear el usuario" });
    }
};

// Controlador para obtener un usuario por ID
export const getUsuario = async (req, res) => {
    try {
        const usuario = await UsuariosModel.findById(req.params.id);
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error al obtener el usuario" });
    }
};

// Controlador para actualizar un usuario (método antiguo)
export const putUsuarios = async (req, res) => {
    try {
        const { names, address, email, phone } = req.body;
        const usuario = await UsuariosModel.findById(req.params.id);
        usuario.names = names;
        usuario.address = address;
        usuario.email = email;
        usuario.phone = phone;
        await usuario.save();
        res.json({ message: "Usuario actualizado" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error al actualizar el usuario" });
    }
};

// Controlador para actualizar un usuario (método nuevo)
export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await UsuariosModel.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        res.json({ usuario });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error al actualizar el usuario" });
    }
};

// Controlador para eliminar un usuario
export const deleteUsuario = async (req, res) => {
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
};
