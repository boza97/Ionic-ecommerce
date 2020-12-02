const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const authValidator = require('../middleware/validators/auth');

router.post('/login', authValidator.loginValidation, authController.login);

router.post('/register', authValidator.registerValidation, authController.register);

module.exports = router;