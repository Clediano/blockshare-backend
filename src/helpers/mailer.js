const Mailer = require('../config/mailer');
const { mail_user } = require('../config/secret');

class Email {
    sendEmail(arrayEmail, attachments, subject, text, onSuccess, onError) {

        arrayEmail && arrayEmail.forEach(email => {

            const message = {
                from: mail_user,
                to: email,
                subject: subject,
                text: text,
                attachments: attachments
            };

            Mailer.sendMail(message, (err, info) => {
                if (err && Boolean(onError)) onError(err);
                onSuccess && onSuccess(info);
            });
        })
    }
}

module.exports = new Email();