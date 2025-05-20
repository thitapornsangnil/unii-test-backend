const axios = require('axios');
const db = require('../models');

async function fetchImportCategory() {
    const response = await axios.get('https://apirecycle.unii.co.th/category/query-product-demo');
    const { productList } = response.data;
    
        for (const p of productList) {
          const category = await db.Category.create({
            id: parseInt(p.categoryId),
            name: p.categoryName
          });
  
          for (const item of p.subcategory) {
              await db.SubCategory.create({
                id: parseInt(item.subCategoryId),
                category_id: category.id,
                name: item.subCategoryName
              });
            }
          };

    console.log('Data imported successfully');
}

module.exports = { fetchImportCategory };