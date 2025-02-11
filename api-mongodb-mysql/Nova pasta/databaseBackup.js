const mysql = require('mysql2');
/*Requer a biblioteca mysql2: A linha importa a biblioteca mysql2, que é uma versão melhorada do driver 
MySQL para Node.js. Ela é usada para estabelecer conexões com o banco de dados MySQL e executar queries 
(consultas SQL). 
*/

const connection = mysql.createConnection({ // Criar a conexão com o banco de dados
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
/* Criação da conexão com o banco de dados: Aqui você cria uma conexão com o banco de dados MySQL.
host: O endereço do servidor onde o MySQL está hospedado, que está sendo lido a partir da variável de 
ambiente DB_HOST.
user: O nome de usuário para conectar ao banco de dados, obtido de DB_USER.
password: A senha do banco de dados, armazenada em DB_PASSWORD.
database: O nome do banco de dados a ser utilizado, retirado da variável de ambiente DB_NAME.
*/

connection.connect((err) => { // Conectar ao banco de dados
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});
/* Conexão com o banco de dados:
O método connect() tenta estabelecer a conexão com o banco de dados MySQL utilizando as configurações 
definidas anteriormente.
O parâmetro err é um objeto de erro que será retornado caso algo dê errado.
Se a conexão falhar, a mensagem de erro será exibida no console. Caso contrário, a mensagem "Conectado ao 
banco de dados MySQL!" será exibida, indicando que a conexão foi bem-sucedida. 
*/

module.exports = connection;
/* Exportando a conexão: O objeto connection (que contém a conexão com o banco de dados) é exportado, 
permitindo que ele seja acessado em outros arquivos do seu projeto. Assim, você pode usar a conexão em 
outras partes da aplicação para fazer consultas ao banco de dados. 
*/

/**Resumo: Esse código cria e configura uma conexão com um banco de dados MySQL usando as variáveis de 
 * ambiente para armazenar informações sensíveis como usuário, senha e nome do banco de dados. Ele tenta 
 * se conectar ao banco e imprime uma mensagem de sucesso ou erro no console. Além disso, a conexão 
 * é exportada para ser reutilizada em outras partes do projeto. */