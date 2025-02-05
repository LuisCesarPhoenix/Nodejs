// O arquivo src/config/mongoConfig.js vai armazenar as conexões com os dois bancos:

require('dotenv').config();
const mongoose = require('mongoose');

// Conectar ao MongoDB remoto (servidor antigo)
const mongoA = mongoose.createConnection(`${process.env.MONGO_URI_OLD}/${process.env.MONGO_DB_OLD}`);

// Conectar ao MongoDB local (servidor novo)
const mongoB = mongoose.createConnection(`${process.env.MONGO_URI_NEW}/${process.env.MONGO_DB_NEW}`);

// Exibir mensagens de conexão no console
mongoA.on('connected', () => console.log(`✅ Conectado ao MongoDB remoto: ${process.env.MONGO_URI_OLD}/${process.env.MONGO_DB_OLD}`));
mongoB.on('connected', () => console.log(`✅ Conectado ao MongoDB local: ${process.env.MONGO_URI_NEW}/${process.env.MONGO_DB_NEW}`));

module.exports = { mongoA, mongoB };
