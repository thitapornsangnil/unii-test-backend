const transactionService = require('../services/transaction');

exports.getAllTransaction = async (req, res) => {
  try {
    console.log('--- getAllTransaction ---');
    const transactions = await transactionService.findAllTransactionCategory(req.query);
    const grouped = transactions.reduce((acc, item) => {
    const { categoryId, categoryName } = item;
  
      if (!acc[categoryId]) {
          acc[categoryId] = {
              categoryId,
              categoryName,
              totalPriceBuy: 0.0,
              totalQuantityBuy: 0.0,
              totalPriceSell: 0.0,
              totalQuantitySell: 0.0,
              subCategories: []
          };
      }
      
      acc[categoryId].totalPriceBuy += item.totalPriceBuy;
      acc[categoryId].totalQuantityBuy += item.totalQuantityBuy;
      acc[categoryId].totalPriceSell += item.totalPriceSell;
      acc[categoryId].totalQuantitySell += item.totalQuantitySell;
      acc[categoryId].subCategories.push(item);
      return acc;
    }, {});
    const result = Object.values(grouped);
    // console.log('--- getAllTransaction result ---', result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
