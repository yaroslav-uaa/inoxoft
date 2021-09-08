require('dotenv').config();

module.exports = {
    SECRET_KEY_ACCESS: process.env.SECRET_KEY_ACCESS || 'access',
    SECRET_KEY_REFRESH: process.env.SECRET_KEY_REFRESH || 'refresh',
    // prettier-ignore
    SECRET_KEY_VERIFICATION: process.env.SECRET_KEY_VERIFICATION || 'verification',
};
