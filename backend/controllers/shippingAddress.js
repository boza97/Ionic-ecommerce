const ShippingAddress = require('../models/ShippingAddress');
const { validationResult } = require('express-validator');

exports.index = async (req, res, next) => {
    try {
        const shippingAddress = await ShippingAddress.findOne({
            where: {
                user_id: req.user.userId
            },
            attributes: {exclude: ['user_id']}
        });

        res.status(200).json({
            status: 'OK',
            shippingAddress: shippingAddress
        });
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }    
}

exports.update = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error);
    }

    const city = req.body.city;
    const cityCode = req.body.cityCode;
    const address = req.body.address;
    const phone = req.body.phone;

    try {
        const shippingAddress = await ShippingAddress.findOne({
            where: {
                user_id: req.user.userId
            },
            attributes: {exclude: ['user_id']}
        });

        if(!shippingAddress) {
            const error = new Error('Shipping address not found.');
            error.statusCode = 400;
            error.data = errors.array();
            throw error;
        }

        shippingAddress.city = city;
        shippingAddress.city_code = cityCode;
        shippingAddress.address = address;
        shippingAddress.phone = phone;
        await shippingAddress.save();

        res.status(200).json({
            status: 'OK'
        });
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}