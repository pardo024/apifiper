const express = require('express');
const mysql = require('mysql2/promise');
const usuariosRouter = require('./usuarios');
const categoriasRouter = require('./categorias');
const movimientosRouter = require('./movimientos');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes HTTP
app.use(express.json());

// Conexión a la base de datos MySQL
async function connectToDatabase() {
  try {

    const connection = await mysql.createConnection('mysql://vhsn0yybieokfcrgv380:pscale_pw_32ubjuHTfNiNNiv7U1KsX7gqC8cckFyekETnyp2AnyO@aws.connect.psdb.cloud/finperbd?ssl={"rejectUnauthorized":true}');
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
app.use('/', (req, res) => {
  res.send('Bienvenido a la API de gestión de gastos');
});
  
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
