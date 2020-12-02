const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const OrderItem = sequelize.define('order_item', {
    order_item_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    timestamps: false,
    underscored: true
});

module.exports = OrderItem;