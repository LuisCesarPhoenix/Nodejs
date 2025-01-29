O que cada pasta/arquivo faz?

server.js: É o arquivo principal que inicializa o servidor e carrega as rotas.

.env: Contém as variáveis de ambiente, como credenciais do banco de dados.

src/config/database.js: Configuração da conexão com o MySQL.

src/routes/userRoutes.js: Rotas que implementam o CRUD para a tabela users

api-crud-mysql/
├── package.json
├── package-lock.json
├── server.js
├── .env
├── src/
│   ├── config/
│   │   └── database.js
│   ├── routes/
│   │   └── userRoutes.js