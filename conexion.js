const mysql = require('mysql2/promise');
require('dotenv').config();

// Conexión a la base de datos MySQL
async function connectToDatabase() {
  try {

    //pscale_pw_30lH5hOsAIRDQW0N6gkLqspUh82S3zKfzG4dcE0vOOX
    const connection = await mysql.createConnection('mysql://6qx0rqtjgkxdj8xe2foq:pscale_pw_30lH5hOsAIRDQW0N6gkLqspUh82S3zKfzG4dcE0vOOX@aws.connect.psdb.cloud/finperbd?ssl={"rejectUnauthorized":true}');

    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
