// src/routes/userRoutes.js (Usa MySQL sem conexões abertas)
// Rota de usuários sem conexão permanente.

const express = require('express');
/* 
Essa linha importa o módulo Express, um framework para Node.js usado para criar aplicações web e APIs de forma simples 
e eficiente. 
O que isso significa?
O Express facilita a criação de servidores HTTP.
Ele oferece suporte a rotas, middlewares, requisições e respostas HTTP.
*/

const { getUsers } = require('../controllers/userController');
/*
Aqui estamos importando a função getUsers do arquivo userController.js, que está localizado na pasta controllers.
O que isso significa?
getUsers contém a lógica para buscar usuários de um banco de dados e retornar os dados como resposta.
{ getUsers } usa desestruturação, o que significa que estamos extraindo essa função específica do módulo userController.
*/

const router = express.Router();
/*
Essa linha cria um novo objeto Router do Express, permitindo definir rotas de forma modular.
O que isso significa?
Em vez de definir todas as rotas diretamente no server.js, usamos o Router() para organizar melhor o código.
Isso torna a aplicação mais modular e fácil de manter.
*/

router.get('/', getUsers);
/*
Define uma rota GET no caminho /, que, ao ser acessada, executa a função getUsers.
O que isso significa?
Quando um cliente (navegador, Postman, etc.) faz uma requisição GET para /api/users (caso seja importado em server.js 
como /api/users), o servidor executa getUsers e retorna os usuários.
getUsers pode, por exemplo, consultar um banco de dados e enviar os usuários como resposta em JSON.
*/

module.exports = router;
/*
Exporta o objeto router para ser usado em outros arquivos.
O que isso significa?
Isso permite que o server.js importe e use as rotas definidas aqui.
No server.js, você pode importar com:
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
Assim, qualquer requisição para /api/users será tratada por esse router.
*/

/*
Resumo:
Importa o Express e a função getUsers.
Cria um roteador com express.Router().
Define uma rota GET / que executa getUsers.
Exporta o roteador para ser usado em server.js.
*/
