const masterDataService = require('../services/masterData');

exports.getAllCategory = async (req, res) => {
  try {
    console.log('--- getAllCategory ---');
    const categories = await masterDataService.findAllCategories(req.query);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSubCategory = async (req, res) => {
  try {
    console.log('--- getAllSubCategory ---');
    const subCategories = await masterDataService.findAllSubCategories(req.query);
    res.json(subCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllGrade = async (req, res) => {
  try {
    console.log('--- getAllGrade ---');
    const grades = ['A', 'B', 'C', 'D'];
    item = [];
    for (let i = 0; i < grades.length; i++) {
      item.push({
        name: grades[i],
      });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
