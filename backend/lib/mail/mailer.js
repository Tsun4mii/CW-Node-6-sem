const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");

exports.sendConfirmationEmail = ({ toUser, code }) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_HOST_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_USER_PASSWORD,
      },
    });

    readHTML("././templates/mailTemplate.html", (err, html) => {
      let template = handlebars.compile(html);
      let replacements = {
        messageText: "TEst",
        link: "Activation Link",
        domain: process.env.DOMAIN,
        code: code,
      };
      let htmlToSend = template(replacements);

      const message = {
        from: process.env.SMTP_SENDER_EMAIL,
        to: toUser,
        subject: "AutoLight - Activate Account",
        html: htmlToSend,
      };
      transporter.sendMail(message, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  });
};

var readHTML = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
      throw err;
    } else {
      callback(null, html);
    }
  });
};
