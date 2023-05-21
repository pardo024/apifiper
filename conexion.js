const mysql = require('mysql2/promise');
require('dotenv').config();

// Conexión a la base de datos MySQL
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection('mysql://om0rcs0m827xivxre8c1:pscale_pw_W7XUYAHcvG1CWmtVMEUv9sSHY4P7VT1Oxt08hcsLtRg@aws.connect.psdb.cloud/finperbd?ssl={"rejectUnauthorized":true}');

    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
