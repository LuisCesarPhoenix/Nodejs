// src/routes/userRoutes.js (Usa MySQL sem conexões abertas)
// Rota de usuários sem conexão permanente.
const express = require('express');
const { getUsers } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);

module.exports = router;
