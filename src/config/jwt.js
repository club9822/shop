var jwt = require('jsonwebtoken');
var passport = require('passport');
var Promise = require('bluebird');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

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


module.accessJWTOptions=accessJWTOptions
