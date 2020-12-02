const Category = require('../models/Category');
const Brand = require('../models/Brand');
const sequelize = require('../util/database');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

exports.getCategories = async (req, res, next) => {
    try {
        // const categories = await Category.find();
        const categories = await sequelize.query("SELECT * FROM categories c WHERE EXISTS (SELECT * FROM products WHERE category_id = c.category_id AND quantity > 0)", {
            model: Category,
            mapToModel: true
        });

        res.status(200).json({
            status: 'OK',
            categories: categories
        });
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getCategoryProducts = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Category id is not valid.');
        error.statusCode = 400;
        return next(error);
    }

    const categoryId = req.params.categoryId;

    try {
        const category = await Category.findByPk(categoryId);

        if(!category) {
            const error = new Error('Category does not exist');
            error.statusCode = 400;
            throw error;
        }

        const products = await category.getProducts({ 
            where: { quantity: { [Op.gt]: 0 } },
            include: [
                {model: Brand},
                {model: Category}
            ],
            attributes: {exclude: ['category_id', 'brand_id']},
        });

        res.status(200).json({
            status: 'OK',
            category: category,
            products: products
        });
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}