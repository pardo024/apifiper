const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./conexion');

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query('SELECT * FROM categoria');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
});

// Agregar una nueva categoría
router.post('/', async (req, res) => {
  const { nombre, color } = req.body;
  try {
    const connection = await connectToDatabase();
    await connection.query('INSERT INTO categoria (idcategoria, nombre, color,idUsuario)  VALUES (?, ?, ?, ?)', [idcategoria, nombre, color,idUsuario]);
    res.sendStatus(201);
  } catch (error) {
    console.error('Error al insertar la categoría:', error);
    res.status(500).json({ error: 'Error al insertar la categoría' });
  }
});

// Actualizar una categoría existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, color } = req.body;
  try {
    const connection = await connectToDatabase();
    await connection.query('UPDATE categoria SET nombre = ?, color = ? WHERE idcategoria = ?', [nombre, color, id]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al actualizar la categoría:', error);
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
});

// Eliminar una categoría existente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await connectToDatabase();
    await connection.query('DELETE FROM categoria WHERE idcategoria = ?', [id]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al eliminar la categoría:', error);
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
});

//obtener una categoria
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.query('SELECT * FROM categoria WHERE idcategoria = ?', [id]);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
});

module.exports = router;
