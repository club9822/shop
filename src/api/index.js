var app = require('../middlewares');

//route

var usersRouter = require('./users');
var mailRouter = require('./mail');

//

app.use('/user', usersRouter);
app.use('/mail', mailRouter);

module.exports = app;
