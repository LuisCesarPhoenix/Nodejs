O que cada pasta/arquivo faz?

api-crud-mysql/: Diretório raiz que contém todo o projeto e sua estrutura de pastas e arquivos.

package.json: Lista dependências, scripts e configurações essenciais do projeto.

package-lock.json: Garante a instalação consistente das versões exatas das dependências.

.env: Armazena variáveis de ambiente e configurações sensíveis fora do código-fonte, como credenciais do banco de dados.

api-crud-mysql/
├── package.json
├── package-lock.json
├── server.js
├── .env
├── src/
│   ├── config/
│   │   ├── mysqlConfig.js         <-- ✅ Configuração do MySQL (Conexão sob demanda)
│   │   ├── mongoConfig.js         <-- ✅ Configuração do MongoDB (Conexão sob demanda)
│   ├── routes/
│   │   ├── userRoutes.js          <-- ✅ Rotas de usuários
│   │   ├── migrationRoutes.js     <-- ✅ Rota para migração de dados
│   ├── controllers/
│   │   ├── userController.js      <-- ✅ Lógica para gerenciar usuários no MySQL
│   │   ├── migrationController.js <-- ✅ Lógica para migrar dados entre bancos MongoDB
├── storage/               <-- 📂 Diretório para manipulação de arquivos
│   ├── work/              <-- 📂 Arquivos brutos aguardando processamento
│   │   ├── file.csv       
│   ├── temporário/        <-- 📂 Arquivos em processamento
│   ├── finalizado/        <-- 📂 Arquivos finalizados
│   │   ├── file.csv_finalizado.csv

1. server.js - Arquivo principal do servidor

Responsável por:
-Iniciar o servidor Express
-Carregar as rotas
-Não conecta diretamente ao banco, garantindo eficiência

Fluxo de execução:
1-Importa pacotes (dotenv, express)
2-Carrega as rotas
3-Inicia o servidor na porta definida no .env

2. .env - Configuração de variáveis de ambiente

Responsável por:
-Armazenar configurações sensíveis (senhas, URLs de banco, porta do servidor)
-Permite modificar as configurações sem alterar o código-fonte

3. src/config/mysqlConfig.js - Configuração da conexão MySQL sob demanda

Responsável por:
-Criar conexões com o banco MySQL apenas quando necessário
-Retornar uma instância da conexão
-Evitar conexões permanentes que desperdiçam recursos

Fluxo de execução:
-Importa mysql2/promise
-Cria a função connectToMySQL() que conecta e retorna a conexão
-Quando chamada, a função conecta e permite fazer queries

4. src/config/mongoConfig.js - Configuração da conexão MongoDB sob demanda

Responsável por:
-Criar conexões com o MongoDB apenas quando necessário
-Retornar uma instância da conexão
-Fechar a conexão após cada requisição

Fluxo de execução:
-Importa MongoClient do pacote mongodb
-Define a função connectToMongoDB() que cria e retorna uma conexão
-O banco só é acessado quando chamado e fechado logo depois

5. src/routes/userRoutes.js - Rotas para usuários

Responsável por:
-Definir as rotas para operações relacionadas a usuários
-Delegar a execução para o userController.js

Fluxo de execução:
-Importa express e o userController
-Cria um router e define as rotas (GET /users)
-Exporta o router para ser usado no server.js

6. src/controllers/userController.js - Lógica de usuários

Responsável por:
-Executar operações relacionadas a usuários no MySQL
-Abrir e fechar conexões corretamente

Fluxo de execução:
-Conecta ao MySQL
-Executa uma query (SELECT * FROM users)
-Retorna os resultados e fecha a conexão após a consulta

7. src/routes/migrationRoutes.js - Rota para migração

Responsável por:
-Criar uma rota que dispara a migração de dados entre bancos MongoDB
-Chamar a função migrateData do migrationController.js

Fluxo de execução:
-Define uma rota POST /migrate
-Chama o controller migrateData

8. src/controllers/migrationController.js - Lógica de migração

Responsável por:
-Migrar dados de um banco MongoDB para outro
-Abrir e fechar a conexão automaticamente

Fluxo de execução:
-Abre uma conexão MongoDB (connectToMongoDB())
-Busca os dados na coleção de origem (cadastro_A)
-Insere os dados na coleção de destino (cadastro_B) em lotes
-Fecha a conexão ao final
