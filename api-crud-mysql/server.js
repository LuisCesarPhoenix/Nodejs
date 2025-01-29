/* Log de erros detalhados: Caso o erro persista, você pode adicionar um log detalhado para depuração.
Isso ajudará a identificar erros silenciosos que possam estar ocorrendo.
*/
process.on('uncaughtException', (err) => {
    console.error('Erro não tratado:', err);
  });
  

/* Essas duas linhas são usadas para configurar e importar as dependências necessárias para o seu servidor
 em Node.js 
Com essas duas linhas, você prepara seu ambiente para:
1 - Carregar variáveis de ambiente de um arquivo .env (útil para configuração segura).
2 - Iniciar a criação de um servidor com o framework Express.
*/
require('dotenv').config(); // Carregar variáveis de ambiente
const express = require('express'); // Importa o Express
/* dotenv: Esse módulo carrega variáveis de ambiente a partir de um arquivo .env para dentro da sua 
aplicação. O método config() lê o arquivo .env e adiciona as variáveis de ambiente ao process.env. 
Isso permite que você armazene informações sensíveis, como senhas de banco de dados, chaves de API 
e configurações de ambiente, de forma segura.
Dessa forma, você pode acessar essas variáveis no código com process.env.NOME_DA_VARIAVEL.
express: Este comando importa o módulo Express para a sua aplicação. O Express é um framework web 
para Node.js que facilita a criação de APIs e servidores. Ao importar o Express, você pode criar rotas, 
configurar middlewares, manipular requisições e respostas, entre outras funcionalidades.
*/

const connection = require('./src/config/database'); // Conexão MySQL


/*Aqui você está criando uma instância do Express, que é o framework para aplicações web em Node.js. 
Isso inicializa o servidor que vai gerenciar as rotas e requisições.
*/
const app = express(); // Inicializa o servidor Express


/*A variável PORT pega a porta do ambiente (se definida) ou usa a porta 3000 como padrão. Isso permite 
que você altere a porta facilmente, dependendo do ambiente onde a aplicação está sendo executada 
(como desenvolvimento ou produção).
*/
const PORT = process.env.PORT || 3000; // Define a porta


/*Esta linha usa o middleware do Express para interpretar requisições com o corpo em formato JSON. 
Isso é necessário para trabalhar com APIs que enviam ou recebem dados JSON.
*/
app.use(express.json()); // Middleware para interpretar JSON


/* rota get "/lista" que fará uma listagem de tarefas adicionadas
exemplo: 
A resposta deve conter uma array de objetos 
Um array, em programação, é uma estrutura de dados que armazena uma coleção ordenada de elementos. Cada elemento possui uma posição numérica chamada índice, que começa em 0.
Exemplos mais variados de arrays simples 
*/


// Declarar os arrays e objetos para teste
/* const numeros = [1, 2, 3, 4, 5]; // Array de números
const misto = [10, "Olá", true, null, { nome: "João" }]; // Array misto (pouco comum, mas demonstra a flexibilidade)
*/
const frutas = ['Maçãs', 'Bananas', 'Leite']; // Array de strings 
const produtos = [ // Array de Objetos
  { produto: 'TV', valor: 'R$ 3000' },
  { produto: 'Geladeira', valor: 'R$ 2500' }
];

// Rota GET para listar frutas
app.get('/api/frutas', (req, res) => {
  res.json({ frutas });
});

// Rota GET para listar produtos
app.get('/api/produtos', (req, res) => {
  res.json({ produtos });
});

// Exibir no console os valores desejados
console.log(frutas[0]); // Saída: Maçãs
console.log(frutas[2]); // Saída: Leite
console.log(produtos[0]); // Saída: Objeto { produto: "TV", valor: "R$ 3000" }
console.log(produtos[0].produto); // Saída: TV
console.log(produtos[0].valor); // Saída: R$ 3000


/* Como testar no Insomnia ou navegador?
Inicie o servidor (se ainda não estiver rodando): digite node server.js
Se estiver usando nodemon: digite npx nodemon server.js

Abra o navegador e acesse os endpoints:

Lista de frutas:
👉 http://localhost:3000/api/frutas
Resposta esperada (JSON):
{
  "frutas": ["Maçãs", "Bananas", "Leite"]
}

Lista de produtos:
👉 http://localhost:3000/api/produtos
Resposta esperada (JSON):
{
  "produtos": [
    { "produto": "TV", "valor": "R$ 3000" },
    { "produto": "Geladeira", "valor": "R$ 2500" }
  ]
}
*/


/* Rota básica
Aqui você está criando uma rota GET na raiz (/). Quando a rota é acessada, a resposta será um objeto 
JSON com a chave message e o valor "Olá Mundo!". O código de status HTTP 200 indica que a requisição 
foi bem-sucedida.
app.get('/', (req, res) => {
res.json({ message: 'Olá Mundo!' });
});
Teste no navegador ou Insomnia
URL: http://localhost:3000/
*/
app.get("/", function(req,res) {
    res.status(200).json({message:"Olá Mundo!"});
  });


/* Inicia o servidor
Essa linha faz o servidor "escutar" a porta definida na variável PORT. Quando o servidor estiver rodando, 
ele exibirá no console a mensagem indicando que está ativo e rodando na URL configurada 
(http://localhost:3000 ou outra porta, dependendo do ambiente).
*/
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


        