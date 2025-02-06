// src/routes/migrationRoutes.js (Rota para migração)
// Chama o controller de migração. Define a rota para iniciar a migração.
const express = require("express");
const router = express.Router();
const { migrateData } = require("../controllers/migrationController");

router.post("/migrate", migrateData);

module.exports = router;
