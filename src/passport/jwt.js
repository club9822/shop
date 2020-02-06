var passport = require('passport');
var Promise = require('bluebird');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var UserService = require('../services/UserService');
// console.log(UserService)
// var UserModel = require('../models/User');

var jwt = require('jsonwebtoken');
var accessJWTOptions = {
  algorithm: ['HS256'],
  expiresIn: process.env.JWT_ACCESS_EXP,
};
var opts = {
  ignoreExpiration: false,
  algorithms: ['HS256'],
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  jsonWebTokenOptions: accessJWTOptions,
  // issuer:'',
  //audience:'
};
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
// passport.use(
//   new JwtStrategy(opts, function(jwt_payload, done) {
//     UserModel.findOne({ id: jwt_payload.sub }, function(err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//         // or you could create a new account
//       }
//     });
//   }),
// );

var jwtUtils = {
  /**
   *
   * @param {String} username //
   * @param {String} password //
   * @return {Bluebird<unknown>}
   */
  sign(username, password) {
    return new Promise(function(resolve, reject) {

      UserService.FindUser(username, password)
        .then(function(user) {
          jwt.sign(
            {
              username: username,
            },

            process.env.JWT_SECRET,
            accessJWTOptions,
            function(err, token) {
              if (err) {
                return reject(err);
              }
              resolve(token);
            },
          );
        })
        .catch(function(e) {
          reject(e);
        });
    });
  },
};

module.exports = jwtUtils;
