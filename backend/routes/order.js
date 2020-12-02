const express = require('express');
const ordersController = require('../controllers/orders');
const isAuth = require('../middleware/is-auth');
const orderValidator = require('../middleware/validators/order');

const router = express.Router();

router.post('/orders', isAuth, orderValidator.orderValidation, ordersController.store);
router.get('/orders', isAuth, ordersController.index);
router.get('/orders/:id', isAuth, ordersController.show);
module.exports = router;