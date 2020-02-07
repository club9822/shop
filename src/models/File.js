var Sequelize = require('sequelize');
var sequelize = require('../config/db');
var User = require('./User');
var File = sequelize.define('file', {
  fileFormat: {
    type: Sequelize.STRING,
  },
  fileName: {
    type: Sequelize.STRING,
  },

  userUploadedId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

module.exports = File;
