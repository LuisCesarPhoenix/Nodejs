// server.js (Inicia o servidor sem abrir conexões)
// Agora o servidor inicia sem conectar ao banco.

const express = require("express");
const app = express();
const migrationRoutes = require("./src/routes/migrationRoutes");

app.use(express.json());
app.use("/api", migrationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

/*
const express = require("express");
const app = express();
const migrationRoutes = require("./src/routes/migrationRoutes");
const userRoutes = require("./src/routes/userRoutes"); // Se houver rotas de usuário

app.use(express.json());
app.use("/api/migration", migrationRoutes);
app.use("/api/users", userRoutes); // Se houver rotas de usuário

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
*/
