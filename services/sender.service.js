const nodemailer = require('nodemailer');
const { configs } = require('../config');

class CreateSender {
    static send(msg) {
        const config = {
            host: 'smtp.meta.ua',
            port: 465,
            secure: true,
            auth: {
                user: configs.EMAIL_NODEMAILER,
                pass: configs.PASSWORD_NODEMAILER,
            },
        };
        const transporter = nodemailer.createTransport(config);
        return transporter.sendMail({
            ...msg,
            from: configs.EMAIL_NODEMAILER,
        });
    }
}

module.exports = CreateSender;
