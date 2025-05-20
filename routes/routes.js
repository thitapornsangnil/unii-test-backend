const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction');
const masterDataController = require('../controllers/masterData');

router.get('/transaction', transactionController.getAllTransaction);
router.get('/category', masterDataController.getAllCategory);
router.get('/sub-category', masterDataController.getAllSubCategory);
router.get('/grade', masterDataController.getAllGrade);

module.exports = router;
