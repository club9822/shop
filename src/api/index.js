
var app = require('../middlewares');

//route

var usersRouter = require('./users');

//

app.use('/user', usersRouter);



module.exports=app
