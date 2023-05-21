const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./conexion');  

//desactiva los cors
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


// Obtener todos los movimientos
router.get('/', async (req, res) => {
  try {
    const connection = await connectToDatabase();
  
    const [rows] = await connection.query('SELECT * FROM movimientos');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los movimientos:', error);
    res.status(500).json({ error: 'Error al obtener los movimientos' });
  }
});
//obtener movimientos por usuario
router.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.query('SELECT * FROM movimientos WHERE idusuario = ?', [id]);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los movimientos:', error);
        res.status(500).json({ error: 'Error al obtener los movimientos' });
    }
});

//obtener movimientos por usuario y categoria
router.get('/usuario/:idusuario/categoria/:idcategoria', async (req, res) => {
    const { idusuario, idcategoria } = req.params;
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.query('SELECT * FROM movimientos WHERE idusuario = ? AND idcategoria = ?', [idusuario, idcategoria]);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los movimientos:', error);
        res.status(500).json({ error: 'Error al obtener los movimientos' });
    }
});

//movimientos por usuario y tipo
router.get('/usuario/:idusuario/tipo/:tipo', async (req, res) => {
    const { idusuario, tipo } = req.params;
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.query('SELECT * FROM movimientos WHERE idusuario = ? AND tipo = ?', [idusuario, tipo]);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los movimientos:', error);
        res.status(500).json({ error: 'Error al obtener los movimientos' });
    }
});



// Agregar un nuevo movimiento
router.post('/', async (req, res) => {
  const { tipo, concepto, idcategoria, idusuario, cantidad, fecha } = req.body;

  try {
    const connection = await connectToDatabase();

    // Realizar la consulta para obtener el último ID de movimiento
    const [rows] = await connection.query('SELECT MAX(idmovimiento) AS id FROM movimientos');
    const newId = rows[0].id + 1;

    //realiza una consulta a categorias para obtener el nombre de la categoria en base al idcategoria
    const [rows2] = await connection.query('SELECT nombre FROM categoria WHERE idcategoria = ?', [idcategoria]);
    const nombreCategoria = rows2[0].nombre;
    // Insertar el nuevo registro con el ID incrementado
    await connection.query(
      'INSERT INTO movimientos (idmovimiento, tipo, concepto, idcategoria, idusuario, cantidad, fecha, nombreCategoria, icono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [newId, tipo, concepto, idcategoria, idusuario, cantidad, fecha, nombreCategoria, 'icono']
    );

    res.sendStatus(201);
  } catch (error) {
    console.error('Error al insertar el movimiento:', error);
    res.status(500).json({ error: 'Error al insertar el movimiento' });
  }
});

// Actualizar un movimiento existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { tipo, concepto, idcategoria, idusuario, cantidad, fecha } = req.body;
  try {
    const connection = await connectToDatabase();
    await connection.query(
      'UPDATE movimientos SET tipo = ?, concepto = ?, idcategoria = ?, idusuario = ?, cantidad = ?, fecha = ? WHERE idmovimiento = ?',
      [tipo, concepto, idcategoria, idusuario, cantidad, fecha, id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al actualizar el movimiento:', error);
    res.status(500).json({ error: 'Error al actualizar el movimiento' });
  }
});

// Eliminar un movimiento existente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await connectToDatabase();
    await connection.query('DELETE FROM movimientos WHERE idmovimiento = ?', [id]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al eliminar el movimiento:', error);
    res.status(500).json({ error: 'Error al eliminar el movimiento' });
  }
});

module.exports = router;
