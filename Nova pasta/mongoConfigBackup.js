/*
require('dotenv').config();
const { MongoClient } = require('mongodb');

// Conectar ao MongoDB remoto (servidor antigo)
const clientA = new MongoClient(process.env.MONGO_URI_OLD);
const clientB = new MongoClient(process.env.MONGO_URI_NEW);

async function connectDatabases() {
  try {
    await clientA.connect();
    console.log(`✅ Conectado ao MongoDB remoto: ${process.env.MONGO_URI_OLD}`);

    await clientB.connect();
    console.log(`✅ Conectado ao MongoDB local: ${process.env.MONGO_URI_NEW}`);

    const dbA = clientA.db(process.env.MONGO_DB_OLD);
    const dbB = clientB.db(process.env.MONGO_DB_NEW);

    return { dbA, dbB };
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}

// Exportando as conexões para uso em outros módulos
module.exports = { connectDatabases, clientA, clientB };
*/

/*
require("dotenv").config();
const { MongoClient } = require("mongodb");

const mongoA = new MongoClient(process.env.MONGO_URI_OLD);
const mongoB = new MongoClient(process.env.MONGO_URI_NEW);

async function connectMongo() {
  try {
    await mongoA.connect();
    await mongoB.connect();

    console.log(`✅ Conectado ao MongoDB remoto: ${process.env.MONGO_URI_OLD}`);
    console.log(`✅ Conectado ao MongoDB local: ${process.env.MONGO_URI_NEW}`);
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
  }
}

connectMongo();

module.exports = { mongoA, mongoB };
*/

// src/config/mongoConfig.js



