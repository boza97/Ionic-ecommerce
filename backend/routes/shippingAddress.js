const express = require('express');
const shippingAddressController = require('../controllers/shippingAddress');
const shippingAddressValidator = require('../middleware/validators/shippingAddress');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/shipping-addresses', isAuth, shippingAddressController.index);
router.patch('/shipping-addresses', isAuth, shippingAddressController.update);

module.exports = router;