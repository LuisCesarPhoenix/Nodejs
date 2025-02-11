/*
const { connectDatabases } = require('../config/mongoConfig');

const COLLECTION_OLD = process.env.MONGO_COLLECTION_OLD; // Origem
const COLLECTION_NEW = process.env.MONGO_COLLECTION_NEW; // Destino
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE, 10) || 1000;

async function migrateData(req, res) {
  try {
    console.log(`🔄 Iniciando migração da coleção "${COLLECTION_OLD}" para "${COLLECTION_NEW}"...`);

    const { dbA, dbB } = await connectDatabases();
    const oldCollection = dbA.collection(COLLECTION_OLD);
    const newCollection = dbB.collection(COLLECTION_NEW);

    let totalMigrated = 0;
    const cursor = oldCollection.find(); // Criando cursor para leitura eficiente
    let batch = [];

    for await (const doc of cursor) {
      batch.push(doc);

      if (batch.length >= BATCH_SIZE) {
        await newCollection.insertMany(batch);
        totalMigrated += batch.length;
        console.log(`✅ ${totalMigrated} registros migrados...`);
        batch = []; // Esvaziar o batch para o próximo lote
      }
    }

    // Inserir os últimos registros (se houver menos de BATCH_SIZE no final)
    if (batch.length > 0) {
      await newCollection.insertMany(batch);
      totalMigrated += batch.length;
      console.log(`✅ ${totalMigrated} registros migrados no total!`);
    }

    console.log("🎉 Migração concluída com sucesso!");
    res.json({ message: "Migração concluída!", total: totalMigrated });

  } catch (error) {
    console.error("❌ Erro na migração:", error);
    res.status(500).json({ error: 'Erro ao migrar os dados' });
  }
}

module.exports = { migrateData };
*/

// src/controllers/migrationController.js
const { connectToMongo } = require('../config/mongoConfig');

const COLLECTION_OLD = process.env.MONGO_COLLECTION_OLD; // Origem
const COLLECTION_NEW = process.env.MONGO_COLLECTION_NEW; // Destino
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE, 10) || 1000;

async function migrateData(req, res) {
  try {
    console.log(`🔄 Iniciando migração da coleção "${COLLECTION_OLD}" para "${COLLECTION_NEW}"...`);

    const client = await connectToMongo();  // Conecta ao MongoDB apenas quando necessário
    const dbA = client.db(process.env.MONGO_DB_OLD);
    const dbB = client.db(process.env.MONGO_DB_NEW);
    const oldCollection = dbA.collection(COLLECTION_OLD);
    const newCollection = dbB.collection(COLLECTION_NEW);

    let totalMigrated = 0;
    const cursor = oldCollection.find(); // Criando cursor para leitura eficiente
    let batch = [];

    for await (const doc of cursor) {
      batch.push(doc);

      if (batch.length >= BATCH_SIZE) {
        await newCollection.insertMany(batch);
        totalMigrated += batch.length;
        console.log(`✅ ${totalMigrated} registros migrados...`);
        batch = []; // Esvaziar o batch para o próximo lote
      }
    }

    if (batch.length > 0) {
      await newCollection.insertMany(batch);
      totalMigrated += batch.length;
      console.log(`✅ ${totalMigrated} registros migrados no total!`);
    }

    console.log("🎉 Migração concluída com sucesso!");
    res.json({ message: "Migração concluída!", total: totalMigrated });

    client.close();  // Fechar a conexão com o MongoDB após a operação
  } catch (error) {
    console.error("❌ Erro na migração:", error);
    res.status(500).json({ error: 'Erro ao migrar os dados' });
  }
}

module.exports = { migrateData };
