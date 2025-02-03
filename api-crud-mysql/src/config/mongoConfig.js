const mongoose = require('mongoose');

const mongoA = mongoose.createConnection(process.env.MONGO_URI_OLD, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
});

const mongoB = mongoose.createConnection(process.env.MONGO_URI_NEW, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
});

mongoA.on('connected', () => console.log('✅ Conectado ao MongoDB (Servidor A)'));
mongoB.on('connected', () => console.log('✅ Conectado ao MongoDB (Servidor B)'));

module.exports = { mongoA, mongoB };
