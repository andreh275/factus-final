import mongoose from 'mongoose';

// Definir un esquema simple para pruebas
const TestSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 }
}, {
  timestamps: true
});

// Crear un modelo a partir del esquema
const TestModel = mongoose.model('ProductoTest', TestSchema);

// Controlador para crear un producto de prueba
export const crearProductoTest = async (req, res) => {
  try {
    console.log("Datos recibidos para crear producto de prueba:", req.body);
    
    // Crear un objeto con datos predeterminados
    const productoData = {
      code: req.body.code || "TEST-CODE",
      name: req.body.name || "Test Product",
      quantity: Number(req.body.quantity) || 1
    };
    
    console.log("Datos del producto de prueba a guardar:", productoData);
    
    // Crear y guardar el producto
    const producto = new TestModel(productoData);
    const savedProducto = await producto.save();
    
    console.log("Producto de prueba guardado:", savedProducto);
    res.status(201).json({ 
      mensaje: "Producto de prueba creado correctamente", 
      producto: savedProducto 
    });
  } catch (error) {
    console.error("Error al crear producto de prueba:", error);
    res.status(500).json({ 
      mensaje: "Error al crear el producto de prueba", 
      error: error.message,
      stack: error.stack
    });
  }
};

// Controlador para obtener todos los productos de prueba
export const obtenerProductosTest = async (req, res) => {
  try {
    console.log("Obteniendo todos los productos de prueba");
    const productos = await TestModel.find();
    console.log(`Se encontraron ${productos.length} productos de prueba`);
    res.json({ productos: productos });
  } catch (error) {
    console.error("Error al obtener productos de prueba:", error);
    res.status(500).json({ 
      mensaje: "Error al obtener los productos de prueba", 
      error: error.message 
    });
  }
};