const mysql = require('mysql2/promise');
require('dotenv').config();

// Conexión a la base de datos MySQL
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection('mysql://18tdpvb7y4p402xxmym1:pscale_pw_VqysoyyTeHydjYTa3mZVZRnq1ZwP3EOCOZ5nWqqcoa8@aws.connect.psdb.cloud/finperbd?ssl={"rejectUnauthorized":true}');

    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
