// src/config/mysqlConfig.js (Conexão MySQL sob demanda)
// Cria a conexão só quando necessário e fecha após a requisição. 

const mysql = require("mysql2/promise");
require("dotenv").config();

async function queryDatabase(query, params = []) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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

