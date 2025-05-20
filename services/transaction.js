const db = require('../models');

async function findAllTransactionCategory(filters) {
  console.log("---- findAllTransactionCategory ----");
  const {
    startDate,
    endDate,
    categoryId,
    subCategoryId,
    orderId,
    priceMax,
    priceMin,
    grade
  } = filters || {};

  const whereClauses = [];
  const replacements = {};

  
  if (startDate && endDate) {
    whereClauses.push(`t.order_finished_date BETWEEN :startDate AND :endDate`);
    replacements.startDate = startDate;
    replacements.endDate = endDate;
  }

  if (orderId && orderId !== '') {
    whereClauses.push(`t.order_id LIKE :orderId`);
    replacements.orderId = `%${orderId}%`;
  }

  if (categoryId && categoryId !== '') {
    whereClauses.push(`c.id = :categoryId`);
    replacements.categoryId = categoryId;
  }

  if (subCategoryId && subCategoryId !== '') {
    whereClauses.push(`sc.id = :subCategoryId`);
    replacements.subCategoryId = subCategoryId;
  }

  if (grade && grade !== '') {
    whereClauses.push(`td.grade = :grade`);
    replacements.grade = grade;
  }

  if (priceMin !== undefined && priceMin !== '') {
    whereClauses.push(`td.price >= :priceMin`);
    replacements.priceMin = priceMin;
  }

  if (priceMax !== undefined && priceMax !== '') {
    whereClauses.push(`td.price <= :priceMax`);
    replacements.priceMax = priceMax;
  }
  
  const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const sql = `
    SELECT 
      sc.id AS subCategoryId, 
      sc.name AS subCategoryName,
      c.id AS categoryId, 
      c.name AS categoryName,
      SUM(CASE WHEN t.type_transaction = 'buy' THEN td.total ELSE 0 END) AS totalPriceBuy ,
      SUM(CASE WHEN t.type_transaction = 'buy' THEN td.quantity ELSE 0 END) AS totalQuantityBuy,
      SUM(CASE WHEN t.type_transaction = 'sell' THEN td.total ELSE 0 END) AS totalPriceSell,
      SUM(CASE WHEN t.type_transaction = 'sell' THEN td.quantity ELSE 0 END) AS totalQuantitySell
    FROM SubCategories AS sc
    LEFT JOIN Categories AS c ON sc.category_id = c.id
    LEFT JOIN TransactionDetails AS td ON td.category_id = c.id AND td.sub_category_id = sc.id
    LEFT JOIN Transactions AS t ON td.transaction_id = t.id
    ${whereSQL}
    GROUP BY sc.id, sc.name, c.id, c.name
  `;

  try {
    console.log("---- Executing SQL ----");
    const rawResults = await db.sequelize.query(sql, {
      replacements,
      type: db.Sequelize.QueryTypes.SELECT
    });

    const results = rawResults.map(row => ({
      ...row,
      totalPriceBuy: parseFloat(Number(row.totalPriceBuy).toFixed(1)) || 0,
      totalQuantityBuy: Number(row.totalQuantityBuy) || 0,
      totalPriceSell: parseFloat(Number(row.totalPriceSell).toFixed(1)) || 0,
      totalQuantitySell: Number(row.totalQuantitySell) || 0,
    }));

    return results;
  } catch (error) {
    console.error('Error in findAllTransactionCategory:', error);
    throw error;
  }
}

module.exports = { findAllTransactionCategory };
