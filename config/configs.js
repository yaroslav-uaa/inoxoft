require('dotenv').config();

module.exports = {
    SECRET_KEY_ACCESS: process.env.SECRET_KEY_ACCESS || 'access',
    SECRET_KEY_REFRESH: process.env.SECRET_KEY_REFRESH || 'refresh',
    SECRET_KEY_RESET: process.env.SECRET_KEY_RESET || 'reset',
    // prettier-ignore
    SECRET_KEY_VERIFICATION: process.env.SECRET_KEY_VERIFICATION || 'verification',

    EMAIL_NODEMAILER: process.env.EMAIL_NODEMAILER || 'ya_ua_dev@meta.ua',
    PASSWORD_NODEMAILER: process.env.PASSWORD_NODEMAILER || 'Slavaukraini2021',
    FRONT_URL: process.env.FRONT_URL || 'https://be-wallet.herokuapp.com',

    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_NAME: process.env.AWS_S3_NAME,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
};
