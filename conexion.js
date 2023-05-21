const mysql = require('mysql2/promise');
require('dotenv').config();

// Conexión a la base de datos MySQL
async function connectToDatabase() {
  try {

    //pscale_pw_30lH5hOsAIRDQW0N6gkLqspUh82S3zKfzG4dcE0vOOX
    const connection = await mysql.createConnection('mysql://root:GHvh3o7t3sooVrii3BkD@containers-us-west-146.railway.app:7569/railway');

    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
