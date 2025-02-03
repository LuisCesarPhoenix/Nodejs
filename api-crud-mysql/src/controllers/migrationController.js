const { mongoA, mongoB } = require('../config/mongoConfig');

const BATCH_SIZE = parseInt(process.env.BATCH_SIZE, 10) || 1000;

// Criando modelos dinâmicos
const OldUser = mongoA.model('users', new mongoA.base.Schema({}, { strict: false }));
const NewUser = mongoB.model('users', new mongoB.base.Schema({}, { strict: false }));

async function migrateUsers(req, res) {
  try {
    console.log(`🔄 Iniciando migração da coleção "users"...`);

    let totalMigrated = 0;
    const cursor = OldUser.find().cursor(); // Criar cursor para leitura eficiente
    let batch = [];

    for await (const doc of cursor) {
      batch.push(doc.toObject());

      if (batch.length >= BATCH_SIZE) {
        await NewUser.insertMany(batch);
        totalMigrated += batch.length;
        console.log(`✅ ${totalMigrated} usuários migrados...`);
        batch = []; // Limpa o batch
      }
    }

    // Inserir os últimos registros, caso haja menos que 1000 no final
    if (batch.length > 0) {
      await NewUser.insertMany(batch);
      totalMigrated += batch.length;
      console.log(`✅ ${totalMigrated} usuários migrados no total!`);
    }

    console.log("🎉 Migração concluída com sucesso!");
    res.json({ message: "Migração concluída!", total: totalMigrated });

  } catch (error) {
    console.error("❌ Erro na migração:", error);
    res.status(500).json({ error: 'Erro ao migrar os dados' });
  }
}

module.exports = { migrateUsers };
