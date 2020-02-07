var Promise = require('bluebird');

var Models = require('../models/index');

var CRUDService = {
  read: function(model, limit, offset, filters = null, attributes = null) {
    return new Promise(function(resolve, reject) {
      /**
       *
       *  conditional query
       *
       */
      let query = {
        limit: parseInt(limit),
        offset: parseInt(offset),
      };
      if (filters) {
        query.filters = filters;
      }
      if (attributes) {
        query.attributes = attributes;
      }
      Models[model]
        .findAll(query)
        .then(function(result) {
          resolve(result);
        })
        .catch(function(e) {
          reject(e);
        });
    });
  },
  create: function(model, items) {
    return new Promise(function(resolve, reject) {
      if (Array.isArray(items) && items.length > 0) {
        Promise.map(function(item, i) {
          return new Promise(function(res, rej) {
            Models[model]
              .create(items)
              .then(function(result) {
                res(result);
              })
              .catch(function(e) {
                rej(e);
              });
          });
        })
          .then(function(results) {
            resolve(results);
          })
          .catch(function(errors) {
            reject(errors);
          });
      } else {
        reject('no item to create');
      }
    });
  },
  update: function(model, items) {
    return new Promise(function(resolve, reject) {});
  },
  createOrUpdate: function(model, items) {
    return new Promise(function(resolve, reject) {});
  },
  delete: function(model, items) {
    return new Promise(function(resolve, reject) {});
  },
};

module.exports = CRUDService;
