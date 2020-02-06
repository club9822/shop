var Sequelize = require('sequelize');
var sequelize = require('../config/db');
var Product = require('./Product');
var User = require('./User');
var Cart = sequelize.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    unique: 'user_product',
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
    unique: 'user_product',
  },
});

module.exports = Cart;
