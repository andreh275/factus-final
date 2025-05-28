import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usuariosRoutes from './routes/Usuarios.js';
import productosRoutes from './routes/Productos.js';
import productoTestRoutes from './routes/ProductoTest.js';
// Importar otras rutas según sea necesario

// Configuración
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware para registrar todas las solicitudes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Ruta de prueba directa
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/Productos', productosRoutes); // Cambiado a /api/Productos con P mayúscula
app.use('/api/producto-test', productoTestRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.CNX_MONGO)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(error => console.error('Error al conectar a MongoDB:', error));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log('Rutas disponibles:');
  console.log('- GET /api/test');
  console.log('- GET /api/usuarios/users');
  console.log('- POST /api/usuarios');
  console.log('- GET /api/Productos');
  console.log('- POST /api/Productos');
  console.log('- GET /api/producto-test');
  console.log('- POST /api/producto-test');
});





