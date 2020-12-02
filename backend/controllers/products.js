const Product = require('../models/Product');
const Brand = require('../models/Brand');
const Category = require('../models/Category');
const { Op } = require('sequelize');

exports.getFeaturedProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            where: {
                [Op.and]: {
                    quantity: {[Op.gt]: 0},
                    featured: 1
                }                
            },
            include: [
                {model: Brand},
                {model: Category}
            ],
            attributes: {exclude: ['category_id', 'brand_id']},
        });

        res.status(200).json({
            status: 'OK',
            products: products
        });
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findOne({
            where: {
                product_id: req.params.id
            },
            attributes: {exclude: ['category_id', 'brand_id']},
            include: [{
                model: Brand
            }, {
                model: Category
            }]
        });

        if(!product) {
            const error = new Error('Product does not exist.');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            status: 'OK',
            product: product
        });
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};