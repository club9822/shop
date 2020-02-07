var UserModel = require('../models/User');
var Promise = require('bluebird');
var jwtUtils = require('../passport/jwt');
var { accessJWTOptions } = require('../config/jwt');
var jwt = require('jsonwebtoken');
var UserService = {
  /**
   *
   * @param {String} username
   * @param  {String} password
   * @constructor
   */
  SignIn: function(username, password) {
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
              resolve({
                detail: 'login success',
                result: {
                  username: username,
                  password: password,
                  token: token,
                },
              });
            },
          );
        })
        .catch(function(e) {
          reject(e);
        });
    });
  },

  /**
   * create new user if not registered before
   * @param{Object} user
   * @constructor
   * @return {Object} user
   */
  SignUp: function(user) {
    const { username, password } = user;
    return new Promise(function(resolve, reject) {
      UserService.FindUser(username, password).then(function(userResponse) {
        if (userResponse) {
          return {
            detail: 'username exist',
          };
        }

        UserModel.create({ ...user })
          .then(function(res) {
            resolve(res);
          })
          .catch(function(e) {
            reject(e);
          });
      });
    });
  },
  /**
   *
   * @param {String} username
   * @param {String} password
   * @constructor
   */
  FindUser: function(username, password) {
    return new Promise(function(resolve, reject) {
      UserModel.findOne({
        where: {
          username: username,
          password: password,
        },
      }).then(function(user) {
        if (user && user.username) {
          return resolve(user);
        }
        reject({
          detail: 'no user exist with this information',
          result: {},
        });
      });
    });
  },
  /**
   *
   * @param {String} username
   * @param {String} password
   * @param {Object} updateFields
   * @constructor
   */
  UpdateUser: function(username, password, updateFields) {
    return new Promise(function(resolve, reject) {
      UserService.FindUser(username, password).then(function(user) {
        UserModel.update(Object.assign(user, updateFields))
          .then(function(updatedUser) {
            resolve({
              detail: '',
              result: updatedUser,
            });
          })
          .catch(function(e) {
            resolve(e);
          });
      });
    });
  },
  /**
   *
   * @param {Number} limit //Fetch limit instances/rows
   * @param {Number}  offset //Skip offset instances/rows
   * @return {Bluebird<unknown>}
   * @constructor
   */
  GetAll: function(limit = null, offset = 0) {
    return new Promise(function(resolve, reject) {
      UserModel.findAll({
        limit: limit,
        offset: offset,
      })
        .then(function(users) {
          resolve({
            detail: '',
            result: users,
          });
        })
        .catch(function(e) {
          resolve({
            detail: e,
          });
        });
    });
  },
  DeleteAll: function() {
    return new Promise(function(resolve, reject) {
      UserModel.sync({
        force: true,
      }).then(function(res) {
        resolve({});
      });
    });
  },
};

module.exports = UserService;
