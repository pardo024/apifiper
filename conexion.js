const mysql = require('mysql2/promise');
require('dotenv').config();

// Conexión a la base de datos MySQL
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection('mysql://i26yqznfjyg5i2mmyyrk:pscale_pw_xXIkmKgkgQRYWr9WYXfGZjRwFSnZ7N5BUyZABccR0kC@aws.connect.psdb.cloud/finperbd?ssl={"rejectUnauthorized":true}');

    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
