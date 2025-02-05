//As rotas (userRoutes.js) devem apenas definir os endpoints e encaminhar as requisições.


const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importando o controller do arquivo userController.js
const connection = require('../config/database');

// Rota para login (autenticação do usuário)
/* router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios!' });
    }

    try {
        const isAuthenticated = await userController.authenticateUser(email, password);

        if (isAuthenticated) {
            res.json({ success: true, message: 'Login bem-sucedido!' });
        } else {
            res.status(401).json({ success: false, message: 'E-mail ou senha incorretos!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar login', details: error });
    }
});
*/

/* router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios!' });
    }

    try {
        const isAuthenticated = await userController.authenticateUser(email, password);

        if (isAuthenticated) {
            res.json({ success: true, message: 'Login bem-sucedido!' });
        } else {
            res.status(401).json({ success: false, message: 'E-mail ou senha incorretos!' });
        }
    } catch (error) {
        console.error('Erro ao processar login:', error); // Log para depuração
        res.status(500).json({ error: 'Erro ao processar login', details: error.message });
    }
});
*/
 
router.post('/login', async (req, res) => {
    console.log('Rota /login foi chamada');

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios!' });
    }

    try {
        console.log('Dados recebidos:', { email, password });
        
        const isAuthenticated = await userController.authenticateUser(email, password);

        if (isAuthenticated) {
            res.json({ success: true, message: 'Login bem-sucedido!' });
        } 
        else {
            res.status(401).json({ success: false, message: 'E-mail ou senha incorretos!' });
        }
    } catch (error) {
        console.error('Erro ao processar login:', error);
        res.status(500).json({ error: 'Erro ao processar login', details: error.message });
    }
});

router.post('/', userController.createUser); // CREATE - Adicionar um usuário

router.get('/', userController.getAllUsers); // READ - Listar todos os usuários

router.get('/:id', userController.getUserById); // READ ONE - Buscar um usuário por ID

router.put('/:id', userController.updateUser); // UPDATE - Atualizar um usuário

router.delete('/:id', userController.deleteUser); // DELETE - Remover um usuário

router.post('/:login', userController.authenticateUser); // LOGIN - Fazer login e autenticar um usuário 

module.exports = router;
