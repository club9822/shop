var express = require('express');
var router = express.Router();
var UserService = require('../services/UserService');

/**
 *
 * METHOD GET
 * get all user list
 *
 */
router.get('/', function(req, res, next) {
  UserService.GetAll(req.query.limit, req.query.offset).then(function(result) {
    res.json(result);
  });
});

/**
 *
 * METHOD POST
 * create new user
 */
router.post('/', function(req, res, next) {
  var user = req.body;
  UserService.SignUp(user)
    .then(function(user) {
      res.json({
        detail: '',
        result: user,
      });
    })
    .catch(function(e) {
      res.json(e);
    });
});

/**
 *  METHOD PUT
 *  Update user fields
 */
router.put('/', function(req, res, next) {
  UserService.UpdateUser(username, req.body)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(e) {
      res.json(e);
    });
});

/**
 * METHOD POST
 * log in   => token
 *
 */


router.post(/token/, function(req, res, next) {
  const { username, password } = req.body;
  console.log(req.body)
  UserService.SignIn(username, password).then(function(result) {
    res.json(result);
  }).catch(function (e) {
    res.json(e);
  });
});

module.exports = router;
