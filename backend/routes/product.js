const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

router.get('/products/featured', productsController.getFeaturedProducts);

router.get('/products/:id', productsController.getProduct);

module.exports = router;