const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ShippingAddress = sequelize.define('shipping_address', {
    shipping_address_id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    contact_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city_code: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    underscored: true
});

module.exports = ShippingAddress;