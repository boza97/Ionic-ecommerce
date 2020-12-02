const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const path = require('path');

// model includes
const Brand = require('./models/Brand');
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');
const ShippingAddress = require('./models/ShippingAddress');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');

// route includes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const shippingAddressRoutes = require('./routes/shippingAddress');
const orderRoutes = require('./routes/order');

const app = express();
app.use(bodyParser.json());

// Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// routes
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(shippingAddressRoutes);
app.use(orderRoutes);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errRes = {
    status: 'ERROR',
    message: error.message
  }

  if(error.data) {
    errRes.errors = error.data;
  }
  console.log(error);
  res.status(statusCode).json(errRes);
});

app.use((req, res, next) => {
  res.status(404).json();
});

// relations
Product.belongsTo(Category, {foreignKey: 'category_id'});
Category.hasMany(Product, {foreignKey: 'category_id'});
Product.belongsTo(Brand, {foreignKey: 'brand_id'});
Brand.hasMany(Product, {foreignKey: 'brand_id'});
ShippingAddress.belongsTo(User, {foreignKey: 'user_id'});
User.hasOne(ShippingAddress, {foreignKey: 'user_id'});
User.hasMany(Order, {foreignKey: 'user_id'});
Order.belongsTo(User, {foreignKey: 'user_id'});
Order.hasMany(OrderItem, {foreignKey: 'order_id'});
OrderItem.belongsTo(Order, {foreignKey: 'order_id'});
Product.hasMany(OrderItem, {foreignKey: 'product_id'});
OrderItem.belongsTo(Product, {foreignKey: 'product_id'});

// init server
sequelize
  .authenticate()
  // .sync({force: true})
  // .sync()
  .then(result => {
    app.listen(process.env.PORT);
  })
  .catch(err => {
    console.log(err);
  });