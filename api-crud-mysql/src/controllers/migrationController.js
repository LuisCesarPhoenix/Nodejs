const { mongoA, mongoB } = require('../config/mongoConfig');

const COLLECTION = process.env.MONGO_COLLECTION;
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE, 10) || 1000;

// Criar modelos de banco de dados dinamicamente
const OldCollection = mongoA.model(COLLECTION, new mongoA.base.Schema({}, { strict: false }));
const NewCollection = mongoB.model(COLLECTION, new mongoB.base.Schema({}, { strict: false }));

async function migrateData(req, res) {
  try {
    console.log(`🔄 Iniciando migração da coleção "${COLLECTION}"...`);

    let totalMigrated = 0;
    const cursor = OldCollection.find().cursor(); // Criar cursor para leitura eficiente
    let batch = [];

    for await (const doc of cursor) {
      batch.push(doc.toObject());

      if (batch.length >= BATCH_SIZE) {
        await NewCollection.insertMany(batch);
        totalMigrated += batch.length;
        console.log(`✅ ${totalMigrated} registros migrados...`);
        batch = []; // Esvazia o batch para o próximo lote
      }
    }

    // Inserir os últimos registros (se houver menos de BATCH_SIZE no final)
    if (batch.length > 0) {
      await NewCollection.insertMany(batch);
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
