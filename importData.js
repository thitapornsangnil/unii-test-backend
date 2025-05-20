const { sequelize } = require('./models'); // หรือ path ที่คุณ export sequelize ไว้
const { fetchImportCategory } = require('./scripts/importCategoryFromApi');
const { fetchImportTransactions } = require('./scripts/importTransactionFromApi');

async function run() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await fetchImportCategory();
    await fetchImportTransactions();

    await sequelize.close();
    console.log('Connection closed.');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();