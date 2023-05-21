const express = require('express');
const mysql = require('mysql2/promise');
const usuariosRouter = require('./usuarios');
const categoriasRouter = require('./categorias');
const movimientosRouter = require('./movimientos');
const app = express();

const PORT = process.env.PORT || 3000;
//desactiva los cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
// Middleware para analizar el cuerpo de las solicitudes HTTP
app.use(express.json());



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
