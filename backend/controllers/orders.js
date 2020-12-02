const Product = require('../models/Product');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const { validationResult } = require('express-validator');
const sequelize = require('../util/database');

exports.index = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            where: {
                user_id: req.user.userId
            },
            attributes: {exclude: ['user_id']}
        });

        res.status(200).json({
            status: 'OK',
            orders: orders
        });
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.store = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    const contactName = req.body.contactName;
    const city = req.body.city;
    const cityCode = req.body.cityCode;
    const address = req.body.address;
    const phone = req.body.phone;
    const products = req.body.products;
    let total = 0;

    for(product of products) {
        if(!product.product_id || !product.quantity) {
            return res.status(422).json({
                status: 'ERROR',
                message: 'Product does not exist.'
            });
        }

        if(isNaN(product.quantity) || product.quantity < 1) {
            return res.status(422).json({
                status: 'ERROR',
                message: 'Quantity must be an integer greater than 1.'
            });
        }

        const prod = await Product.findOne({where: {product_id: product.product_id}});

        if(!prod) {
            return res.status(422).json({
                status: 'ERROR',
                message: 'Product does not exist.'
            });
        }

        if(product.quantity > prod.quantity) {
            return res.status(422).json({
                status: 'ERROR',
                message: 'At this moment we dont have enough quantity in stock.'
            });
        }

        product.price = prod.price;
        product.model = prod
        total += product.price * product.quantity;
    }    

    const transaction = await sequelize.transaction();

    try {
        const order = await Order.create({
            contact_name: contactName,
            city: city,
            city_code: cityCode,
            address: address,
            phone: phone,
            total: total,
            user_id: req.user.userId
        }, { transaction: transaction });

        for(product of products) {
            await OrderItem.create({
                quantity: product.quantity,
                price: product.price,
                order_id: order.order_id,
                product_id: product.product_id
            }, { transaction: transaction });

            product.model.quantity -= product.quantity;
            await product.model.save();
        }

        await transaction.commit();

        res.status(201).json({
            status: 'OK',
            message: 'Order has been created successfully.'
        })
    } catch (error) {
        await transaction.rollback();
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

exports.show = async (req, res, next) => {
    try {
        const order = await Order.findOne({
            where: {
                user_id: req.user.userId,
                order_id: req.params.id
            },
            include: {
                model: OrderItem,
                include: {
                    model: Product
                },
                attributes: {exclude: ['product_id', 'order_id']}
            },
            attributes: {exclude: ['user_id']}
        });

        if(!order) {
            return res.status(404).json({
                status: 'NOT_FOUND',
                message: 'Order not found.'
            })
        }

        res.status(200).json({
            status: 'OK',
            order: order
        });
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}