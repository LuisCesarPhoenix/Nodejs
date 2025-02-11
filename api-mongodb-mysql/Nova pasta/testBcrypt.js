const bcrypt = require('bcrypt');

const senhaDigitada = 'luiz777'; // Senha real usada no cadastro
const hashSalvoNoBanco = '$2b$10$qnff01Db3vXFqRssPM0SH.l2bosXQXAG7Es.vzVvFoWAAKmAyNQVy'; // Copie o hash do banco

bcrypt.compare(senhaDigitada, hashSalvoNoBanco)
    .then(result => {
        console.log('Senha correta?', result);
    })
    .catch(error => {
        console.error('Erro ao comparar senha:', error);
    });
