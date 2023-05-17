const express = require('express');
const mysql = require('mysql2/promise');
const usuariosRouter = require('./usuarios');
const categoriasRouter = require('./categorias');
const movimientosRouter = require('./movimientos');
const app = express();
const PORT = 3000;

// Middleware para analizar el cuerpo de las solicitudes HTTP
app.use(express.json());

// Conexión a la base de datos MySQL
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

// Rutas de usuarios
app.use('/usuarios', usuariosRouter);
app.use('/categorias', categoriasRouter);
app.use('/movimientos', movimientosRouter);
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
