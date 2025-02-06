// src/config/mongoConfig.js (Conexão MongoDB sob demanda)
// Conecta e fecha após cada requisição.
const { MongoClient } = require('mongodb');

async function connectToMongoDB() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  return client;
}

module.exports = { connectToMongoDB };
