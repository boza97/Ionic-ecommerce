const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Category = sequelize.define('category', {
  category_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  underscored: true
});

module.exports = Category;