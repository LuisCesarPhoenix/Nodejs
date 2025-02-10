// src/controllers/userController.js (Consulta MySQL e fecha conexão)
// Agora cada requisição abre e fecha a conexão.

const { connectToMySQL } = require('../config/mysqlConfig');
/*
Importação da função de conexão com MySQL:
Importa a função connectToMySQL do arquivo mysqlConfig.js, que será usada para conectar ao banco de dados MySQL.
*/

async function getUsers(req, res) {
/*
Declaração da função assíncrona getUsers:
Define a função getUsers, que será responsável por buscar os usuários no banco de dados.
Parâmetros:
-req: Representa a requisição HTTP recebida.
-res: Representa a resposta HTTP que será enviada.
Por que async? Como a função realiza operações assíncronas (banco de dados), usamos async para trabalhar com await.
*/
  try { 
  /*
  Tenta executar o código dentro do bloco try:
  O bloco try tenta executar o código normalmente. Se ocorrer um erro, ele será tratado no catch.
  */
    const connection = await connectToMySQL();
    /*
    Conexão com o banco de dados:
    Chama a função connectToMySQL(), aguardando que a conexão com o banco seja estabelecida.
    Por que await? Porque connectToMySQL() é assíncrona e retorna uma Promise.
    */
    const [rows] = await connection.execute('SELECT * FROM users');
    /*
    Executa a consulta SQL para buscar todos os usuários:
    Executa a query SELECT * FROM users, buscando todos os usuários da tabela users.
    Por que await? Porque connection.execute() retorna uma Promise, e precisamos esperar a resposta.
    Por que [rows]? O método execute() retorna um array, onde rows contém os resultados da consulta.
    */
    await connection.end(); 
    /*
    Fecha a conexão com o banco de dados após a consulta:
    Fecha a conexão com o MySQL para evitar consumo desnecessário de recursos.
    Por que await? Porque connection.end() é uma operação assíncrona e precisamos garantir que ela seja concluída 
    antes de seguir.
    */
    res.json(rows);
    /*
    Envia os dados para o cliente como resposta JSON:
    Envia os dados buscados (rows) para o cliente no formato JSON.
    */
  } catch (error) {
    /*
    Captura e trata erros:
    Se alguma parte do código dentro do try falhar (por exemplo, erro na conexão ou consulta SQL), ele entra no catch 
    para tratar o erro.
    */
    console.error('❌ Erro ao buscar usuários:', error);
    /*
    Exibe o erro no console:
    Exibe uma mensagem de erro no console para facilitar o diagnóstico.
    */
    res.status(500).json({ error: 'Erro ao buscar usuários' });
    /*
    Retorna um erro HTTP 500 para o cliente:
    Envia um erro HTTP 500 (Erro interno do servidor) junto com uma mensagem JSON para informar que algo deu errado.
    */
  }
}

module.exports = { getUsers };
/*
Exporta a função getUsers:
Exporta a função getUsers para que ela possa ser usada em outros arquivos, como nas rotas.
*/

/* 
Resumo do fluxo do código:
Importa a função de conexão com MySQL.
Conecta ao banco quando a rota for chamada.
Executa a query para buscar os usuários.
Fecha a conexão após a consulta.
Retorna os dados para o cliente.
Em caso de erro, exibe no console e retorna um erro HTTP 500.
*/