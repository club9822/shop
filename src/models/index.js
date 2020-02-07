var File=require('./File');
var Cart=require('./Cart');
var Order =require('./Order')
var User=require('./User');
var Product=require('./Product');


/**
 *
 * @type {{Order, User, Product, File, Cart}}
 *
 *
 */
var Models={
    File:File,
    Cart:Cart,
    Order:Order,
    User:User,
    Product:Product
}



module.exports=Models


