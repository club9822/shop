var express = require('express');
var router = express.Router();
var MailService = require('../services/MailService');

/**
 * METHOD POST
 *
 * send mail
 *
 */
router.post('/', function(req, res, next) {
  MailService.SendMail(req.body.emailes)
    .then(function(result) {
      res.json({
        detail: '',
        result: result,
      });
    })
    .catch(function(e) {
      res.json({
        detail: '',
        result: e,
      });
    });
});

module.exports = router;
