const bcrypt = require('bcrypt');

const senhaDigitada = 'senha978'; // Senha real usada no cadastro
const hashSalvoNoBanco = '$2b$10$UdWa5177HPPaL4enDU3cKOvjY7Vh.nxc5PrQXpN2JUKh2ZuMNpIUW'; // Copie o hash do banco

bcrypt.compare(senhaDigitada, hashSalvoNoBanco)
    .then(result => {
        console.log('Senha correta?', result);
    })
    .catch(error => {
        console.error('Erro ao comparar senha:', error);
    });
