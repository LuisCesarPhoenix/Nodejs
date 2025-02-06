/* src/config/mysqlConfig.js (Conexão MySQL sob demanda)
 Cria a conexão só quando necessário e fecha após a requisição.
*/
const mysql = require('mysql2/promise');

async function connectToMySQL() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  return connection;
}

module.exports = { connectToMySQL };
