O que cada pasta/arquivo faz?

api-crud-mysql/: Diretório raiz que contém todo o projeto e sua estrutura de pastas e arquivos.

package.json: Lista dependências, scripts e configurações essenciais do projeto.

package-lock.json: Garante a instalação consistente das versões exatas das dependências.

server.js: Inicia o servidor, configura middlewares e integra as rotas do app.

.env: Armazena variáveis de ambiente e configurações sensíveis fora do código-fonte, como credenciais do banco de dados.

src/config/database.js: Configura a conexão com o banco de dados MySQL utilizado no projeto.

src/routes/userRoutes.js: Define os endpoints e mapeia as rotas para operações de usuários, como o CRUD para a tabela users.

src/controllers/userController.js: Contém a lógica dos endpoints para criar, ler, atualizar e deletar usuários.

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
│   └── controllers/
│       └── userController.js
└── 
