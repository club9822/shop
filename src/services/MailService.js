var nodemailer = require('nodemailer');
var Promise = require('bluebird');
var MailService = {
  /**
   *
   * @constructor
   * @param {Array} emails
   * @return {Array}
   */
  SendMail: function(emails = []) {
    return new Promise(function(resolve, reject) {
      if (Array.isArray(emails) && emails.length > 0) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        var mailConfig;
        if (process.env.NODE_ENV === 'production') {
          // all emails are delivered to destination
          mailConfig = {
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
              user: 'real.user',
              pass: 'verysecret',
            },
          };
        } else {
          //development server
          // all emails are catched by ethereal.email
          mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
              user: 'e77xieeyovfq3is7@ethereal.email',
              pass: 'wPpyW13dKQBWXQznAE',
            },
          };
        }

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport(mailConfig);

        //result array
        var mailSendList = [];
        emails.forEach(function(mail, i) {
          var { id, from, to, subject, text, html } = mail;
          if (to && subject) {
            transporter
              .sendMail({
                from: from || 'club9822@gmail.com', // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                text: text || '', // plain text body
                html: html || '', // html body
              })
              .then(function(info) {
                mailSendList.push(Object.assign(info, { id: id, type: 'success' }));
                if (i === emails.length - 1) {
                  //return result array in end of loop
                  resolve(mailSendList);
                }
              });
          } else {
            mailSendList.push(
              Object.assign(mail, {
                id: id,
                type: 'fail',
              }),
            );
            if (i === emails.length - 1) {
              //return result array in end of loop
              resolve(mailSendList);
            }
          }
        });
      } else {
        reject([]);
      }
    });
  },
};

module.exports = MailService;
