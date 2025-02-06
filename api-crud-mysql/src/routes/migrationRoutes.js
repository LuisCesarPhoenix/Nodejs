// src/routes/migrationRoutes.js (Rota para migração)
// Chama o controller de migração.
const express = require('express');
const { migrateData } = require('../controllers/migrationController');

const router = express.Router();

router.post('/migrate', migrateData);
// router.post('/', migrateData);
module.exports = router;

