//O controller (userController.js) deve conter a lógica da requisição, como a criação de um usuário no 
// banco de dados.

const bcrypt = require('bcrypt');
const db = require('../config/database');

// Criar usuário
const createUser = async (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    try {
        // Criptografando a senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)';
        const values = [name, username, email, hashedPassword];

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao criar usuário', details: err });
            }
            res.status(201).json({ message: 'Usuário criado com sucesso!', id: result.insertId });
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar requisição', details: error });
    }
};

// Buscar todos os usuários (sem senha por segurança)
const getAllUsers = (req, res) => {
    const sql = 'SELECT id, name, username, email FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar usuários.' });
        }
        res.json(results);
    });
};

// Buscar um usuário por ID
const getUserById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT id, name, username, email FROM users WHERE id = ?';
    
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar usuário.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.json(results[0]);
    });
};

// Atualizar um usuário
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, username, email, password } = req.body;

    try {
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const sql = 'UPDATE users SET name = ?, username = ?, email = ?, password = ? WHERE id = ?';
        const values = [name, username, email, hashedPassword, id];

        db.query(sql, values, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }
            res.json({ message: 'Usuário atualizado com sucesso!' });
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar requisição', details: error });
    }
};

// Remover um usuário
const deleteUser = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar usuário.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.json({ message: 'Usuário removido com sucesso!' });
    });
};

module.exports = { 
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
};

