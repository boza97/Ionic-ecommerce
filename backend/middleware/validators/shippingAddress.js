const { body } = require('express-validator');

exports.registerValidation = [
    body('city')
        .optional()
        .isString()
        .withMessage('City is not valid.')
        .trim(),
    body('cityCode')
        .optional()
        .isInt()
        .withMessage('City code is not valid.')
        .trim(),
    body('address')
        .optional()
        .isString()
        .withMessage('Address is not valid.')
        .trim(),
    body('phone')
        .optional()
        .isString()
        .withMessage('Address is not valid.')
        .trim()
];