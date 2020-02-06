var Sequelize = require('sequelize');
var sequelize = require('../config/db');
var Product = require('./Product');
var ProductCategory = sequelize.define('product_category', {

});

module.exports = ProductCategory;
