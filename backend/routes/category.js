const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories.js');
const categoryValidator = require('../middleware/validators/category');

router.get('/categories', categoriesController.getCategories);

router.get('/categories/:categoryId/products', categoryValidator.categoryProductsValidation, categoriesController.getCategoryProducts);

module.exports = router;