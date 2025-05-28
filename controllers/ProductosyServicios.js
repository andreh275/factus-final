import ProductosyServiciosModel from '../models/ProductosyServicios.js';

// Controlador para obtener todos los productos y servicios
export const getProductosyServicios = async (req, res) => {
  try {
    console.log("Obteniendo todos los productos y servicios");
    const productos = await ProductosyServiciosModel.find();
    console.log(`Se encontraron ${productos.length} productos`);
    res.json({ productosyservicios: productos });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ 
      mensaje: "Error al obtener los productos", 
      error: error.message 
    });
  }
};

// Controlador para crear un nuevo producto o servicio
export const postProductosyServicios = async (req, res) => {
  try {
    console.log("Datos recibidos para crear producto:", JSON.stringify(req.body));
    
    // Verificar si el modelo existe
    console.log("Modelo ProductosyServicios:", typeof ProductosyServiciosModel);
    
    // Intentar crear un objeto simple primero
    try {
      const testObj = {
        code_reference: "TEST-CODE",
        name: "Test Product",
        quantity: 1
      };
      console.log("Creando objeto de prueba:", testObj);
      
      // Crear un documento de prueba sin guardarlo
      const testDoc = new ProductosyServiciosModel(testObj);
      console.log("Documento de prueba creado:", testDoc);
      
      // Validar el documento
      const validationError = testDoc.validateSync();
      if (validationError) {
        console.error("Error de validación:", validationError);
        return res.status(400).json({
          mensaje: "Error de validación",
          error: validationError.message
        });
      }
      
      console.log("Documento de prueba válido");
    } catch (testError) {
      console.error("Error al crear objeto de prueba:", testError);
      return res.status(500).json({
        mensaje: "Error al crear objeto de prueba",
        error: testError.message
      });
    }
    
    // Ahora intentar con los datos reales
    try {
      // Crear un objeto con solo los campos necesarios
      const productoData = {
        code_reference: req.body.code_reference || "DEFAULT-CODE",
        name: req.body.name || "Default Product",
        quantity: Number(req.body.quantity) || 1
      };
      
      console.log("Datos del producto a guardar:", productoData);
      
      // Crear el documento
      const producto = new ProductosyServiciosModel(productoData);
      console.log("Documento creado:", producto);
      
      // Validar el documento
      const validationError = producto.validateSync();
      if (validationError) {
        console.error("Error de validación:", validationError);
        return res.status(400).json({
          mensaje: "Error de validación",
          error: validationError.message
        });
      }
      
      console.log("Documento válido, intentando guardar...");
      
      // Guardar el documento
      const savedProducto = await producto.save();
      console.log("Producto guardado:", savedProducto);
      
      res.status(201).json({ 
        mensaje: "Producto creado correctamente", 
        productosyservicios: savedProducto 
      });
    } catch (saveError) {
      console.error("Error al guardar producto:", saveError);
      res.status(500).json({ 
        mensaje: "Error al guardar el producto", 
        error: saveError.message,
        stack: saveError.stack
      });
    }
  } catch (error) {
    console.error("Error general al crear producto:", error);
    res.status(500).json({ 
      mensaje: "Error general al crear el producto", 
      error: error.message,
      stack: error.stack
    });
  }
};

// Controlador para actualizar un producto existente
export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Actualizando producto con ID: ${id}`, req.body);
    
    const producto = await ProductosyServiciosModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    
    console.log("Producto actualizado:", producto);
    res.json({ productosyservicios: producto });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ 
      mensaje: "Error al actualizar el producto", 
      error: error.message 
    });
  }
};

// Controlador para eliminar un producto
export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Eliminando producto con ID: ${id}`);
    
    const producto = await ProductosyServiciosModel.findByIdAndDelete(id);
    
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    
    console.log("Producto eliminado:", producto);
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ 
      mensaje: "Error al eliminar el producto", 
      error: error.message 
    });
  }
};








