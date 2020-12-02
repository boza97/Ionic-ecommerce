const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Brand = sequelize.define('brand', {
  brand_id: {
    type: Sequelize.INTEGER, 
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  underscored: true
});

module.exports = Brand;