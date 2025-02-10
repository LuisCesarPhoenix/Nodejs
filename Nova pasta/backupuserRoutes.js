//As rotas (userRoutes.js) devem apenas definir os endpoints e encaminhar as requisições.

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importando o controller

// CREATE - Adicionar um usuário
router.post('/', userController.createUser);

// READ - Listar todos os usuários
router.get('/', userController.getAllUsers);

// READ ONE - Buscar um usuário por ID
router.get('/:id', userController.getUserById);

// UPDATE - Atualizar um usuário
router.put('/:id', userController.updateUser);

// DELETE - Remover um usuário
router.delete('/:id', userController.deleteUser);

module.exports = router;

