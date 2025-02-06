// src/config/mysqlConfig.js (Conexão MySQL sob demanda)
// Cria a conexão só quando necessário e fecha após a requisição. 

const mysql = require("mysql2/promise");
require("dotenv").config();

async function queryDatabase(query, params = []) {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  });

  try {
    const [rows] = await connection.execute(query, params);
    return rows;
  } catch (error) {
    console.error("❌ Erro no MySQL:", error);
    throw error;
  } finally {
    await connection.end();
    console.log("🔌 Conexão com MySQL fechada.");
  }
}

module.exports = { queryDatabase };

