import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Definir un esquema simple para pruebas
const TestSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now }
});

// Crear un modelo a partir del esquema
const Test = mongoose.model('Test', TestSchema);

// Función para probar la conexión a la base de datos
async function testDatabaseConnection() {
  try {
    console.log('Intentando conectar a MongoDB...');
    console.log('URL de conexión:', process.env.CNX_MONGO);
    
    await mongoose.connect(process.env.CNX_MONGO);
    console.log('Conexión exitosa a MongoDB');
    
    // Crear un documento de prueba
    console.log('Creando documento de prueba...');
    const testDoc = new Test({ name: 'Test Document' });
    await testDoc.save();
    console.log('Documento guardado exitosamente:', testDoc);
    
    // Buscar el documento
    console.log('Buscando documentos...');
    const docs = await Test.find();
    console.log('Documentos encontrados:', docs);
    
    // Cerrar la conexión
    await mongoose.connection.close();
    console.log('Conexión cerrada');
    
    return { success: true, message: 'Prueba completada exitosamente' };
  } catch (error) {
    console.error('Error en la prueba de conexión:', error);
    return { success: false, error: error.message, stack: error.stack };
  }
}

// Ejecutar la prueba
testDatabaseConnection()
  .then(result => {
    console.log('Resultado de la prueba:', result);
    process.exit(result.success ? 0 : 1);
  })
  .catch(error => {
    console.error('Error inesperado:', error);
    process.exit(1);
  });