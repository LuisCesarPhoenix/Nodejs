// server.js (Inicia o servidor sem abrir conexões)
// Agora o servidor inicia sem conectar ao banco.

require('dotenv').config();
const express = require('express');

const userRoutes = require('./src/routes/userRoutes');
const migrationRoutes = require('./src/routes/migrationRoutes');

const app = express();
app.use(express.json());

// Rotas
app.use('/users', userRoutes);
app.use('/migrate', migrationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
