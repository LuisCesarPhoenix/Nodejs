// src/config/mongoConfig.js (Conexão MongoDB sob demanda)
// Responsável por criar conexões temporárias para cada requisição. conecta e fecha após cada requisição.
const { MongoClient } = require("mongodb");
require("dotenv").config();

async function connectMongoDB(uri, dbName) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log(`✅ Conectado ao MongoDB: ${uri}`);
    return { client, db: client.db(dbName) };
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    throw error;
  }
}

module.exports = { connectMongoDB };

// A conexão só ocorre quando chamada, evitando consumo desnecessário de recursos.
// Retorna tanto o cliente quanto o banco de dados, para que possamos fechar a conexão após a operação.
