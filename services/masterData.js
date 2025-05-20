const db = require('../models');

async function findAllCategories() {
    console.log("---- findAllCategories ----");
    try {
    console.log("---- Executing SQL ----");
    const results = await db.Category.findAll();
    // console.log("---- SQL Results ----", results);
    return results;
    } catch (error) {
    console.error('Error in findAllCategories:', error);
    throw error;
    }
}

async function findAllSubCategories(filters) {
    console.log("---- findAllSubCategories ----");
    try {
    const { categoryId } = filters || {};
    const where = {};
    if (categoryId && categoryId !== '') {
        where.category_id = parseInt(categoryId);
    }
    console.log("---- Executing SQL ----");
    const results = await db.SubCategory.findAll( { where } );
    // console.log("---- SQL Results ----", results);
    return results;
    } catch (error) {
    console.error('Error in findAllSubCategories:', error);
    throw error;
    }
}

module.exports = { findAllCategories, findAllSubCategories };
