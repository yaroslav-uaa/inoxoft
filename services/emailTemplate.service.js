const Mailgen = require('mailgen');
const { configs } = require('../config');

class EmailService {
    constructor(sender) {
        this.sender = sender;
        this.link = configs.FRONT_URL;
    }

    createTemplateVerificationEmail(token) {
        const mailGenerator = new Mailgen({
            theme: 'neopolitan',
            product: {
                name: 'Inoxoft Cars System',
                link: this.link,
            },
        });
        const email = {
            body: {
                intro: "Welcome to Inoxoft Cars System! We're very excited to have you on board.",
                action: {
                    instructions:
                        'To get started with Inoxoft Cars System, please click here:',
                    button: {
                        color: '#7427F3',
                        text: 'Confirm your account',
                        link: `${this.link}/verify/${token}`,
                    },
                },
            },
        };
        return mailGenerator.generate(email);
    }

    async sendVerificationEmail(token, email) {
        const emailHtml = this.createTemplateVerificationEmail(token);
        const msg = {
            to: email,
            subject: 'Verify your account',
            html: emailHtml,
        };
        await this.sender.send(msg);
    }

    createTemplateResetPassword(resetToken) {
        const mailGenerator = new Mailgen({
            theme: 'salted',
            textDirection: 'rtl',
            product: {
                name: 'Inoxoft Cars System',
                link: this.link,
            },
        });
        const passwordResetEmail = {
            body: {
                intro: 'Sign-up Verification API - Reset Password',
                action: {
                    instructions:
                        'Please click the below button to reset your password, the link will be valid for 7 day:',
                    button: {
                        color: '#7427F3',
                        text: 'RESET',
                        link: `${this.link}/reset-password?resettoken=${resetToken}`,
                    },
                },
            },
        };
        return mailGenerator.generate(passwordResetEmail);
    }

    async sendResetPasswordEmail(resetToken, passwordResetEmail) {
        const emailHtml = this.createTemplateResetPassword(resetToken);
        const msg = {
            to: passwordResetEmail,
            subject: 'Reset password for your account',
            html: emailHtml,
        };
        await this.sender.send(msg);
    }
}

module.exports = EmailService;
