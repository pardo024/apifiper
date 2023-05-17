const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

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
    await connection.query(
      'INSERT INTO movimientos (tipo, concepto, idcategoria, idusuario, cantidad, fecha) VALUES (?, ?, ?, ?, ?, ?)',
      [tipo, concepto, idcategoria, idusuario, cantidad, fecha]
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
