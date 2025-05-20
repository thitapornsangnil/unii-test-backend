const axios = require('axios');
const db = require('../models');

async function fetchImportTransactions() {
    const response = await axios.get('https://apirecycle.unii.co.th/Stock/query-transaction-demo');
    const { buyTransaction, sellTransaction } = response.data;

    const processTransactionGroup = async (transactions, typeTransaction) => {
        for (const tx of transactions) {
          const transaction = await db.Transaction.create({
            order_id: tx.orderId,
            order_finished_date: tx.orderFinishedDate,
            order_finished_time: tx.orderFinishedTime,
            type_transaction: typeTransaction
          });
  
          for (const item of tx.requestList) {
            const { categoryID, subCategoryID, requestList } = item;
            for (const detail of requestList) {
              await db.TransactionDetail.create({
                transaction_id: transaction.id,
                category_id: parseInt(categoryID),
                sub_category_id: parseInt(subCategoryID),
                grade: detail.grade,
                price: parseFloat(detail.price),
                quantity: parseInt(detail.quantity),
                total: parseFloat(detail.total)
              });
            }
          }
  
          if (tx.transactionParties) {
            for (const [type, party] of Object.entries(tx.transactionParties)) {
              await db.TransactionParties.create({
                transaction_id: transaction.id,
                type,
                role_name: party.roleName,
                name: party.name,
                parties_id: party.id
              });
            }
          }
        }
      };

    await processTransactionGroup(buyTransaction, 'buy');
    await processTransactionGroup(sellTransaction, 'sell');

    console.log('Data imported ะransaction successfully');
}

module.exports = { fetchImportTransactions };