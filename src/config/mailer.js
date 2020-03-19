const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const {mail_host, mail_pass, mail_port, mail_user} = require('../config/secret');

var transport = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    host: mail_host,
    port: mail_port,
    secure: true,
    connectionTimeout: 5000,
    auth: {
        user: mail_user,
        pass: mail_pass
    }
}));

module.exports = transport;
