// src/controllers/userController.js (Consulta MySQL e fecha conexão)
// Agora cada requisição abre e fecha a conexão.
const { connectToMySQL } = require('../config/mysqlConfig');

async function getUsers(req, res) {
  try {
    const connection = await connectToMySQL();
    const [rows] = await connection.execute('SELECT * FROM users');
    await connection.end(); // 🔴 Fecha a conexão após a consulta
    res.json(rows);
  } catch (error) {
    console.error('❌ Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
}

module.exports = { getUsers };
