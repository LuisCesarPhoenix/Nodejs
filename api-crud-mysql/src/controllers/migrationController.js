// src/controllers/migrationController.js (Migração com conexão sob demanda)
// A conexão é aberta apenas na migração e fechada no final
const { connectToMongoDB } = require('../config/mongoConfig');

const COLLECTION_OLD = process.env.MONGO_COLLECTION_OLD;
const COLLECTION_NEW = process.env.MONGO_COLLECTION_NEW;
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE, 10) || 1000;

async function migrateData(req, res) {
  let client;
  try {
    console.log(`🔄 Iniciando migração da coleção "${COLLECTION_OLD}" para "${COLLECTION_NEW}"...`);
    
    client = await connectToMongoDB(); // 🔴 Conecta ao MongoDB
    const dbA = client.db(process.env.MONGO_DB_A);
    const dbB = client.db(process.env.MONGO_DB_B);

    const oldCollection = dbA.collection(COLLECTION_OLD);
    const newCollection = dbB.collection(COLLECTION_NEW);

    let totalMigrated = 0;
    const cursor = oldCollection.find();
    let batch = [];

    for await (const doc of cursor) {
      batch.push(doc);
      if (batch.length >= BATCH_SIZE) {
        await newCollection.insertMany(batch);
        totalMigrated += batch.length;
        console.log(`✅ ${totalMigrated} registros migrados...`);
        batch = [];
      }
    }

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
  } finally {
    if (client) await client.close(); // 🔴 Fecha a conexão
  }
}

module.exports = { migrateData };
