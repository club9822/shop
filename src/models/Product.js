var Sequelize = require('sequelize');
var sequelize = require('../config/db');

var Product = sequelize.define('product', {
  name: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
  },
});

module.exports = Product;
