const { param } = require('express-validator');

exports.categoryProductsValidation = [
    param('categoryId')
        .isInt()
        .withMessage('Category id is not valid.')
        .toInt()
];