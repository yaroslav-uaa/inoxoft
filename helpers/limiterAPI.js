const { statusCodesEnum } = require('../config');

const limiterAPI = {
    windowMs: 60 * 60 * 1000,
    max: 10000,
    handler: (req, res) => res.status(statusCodesEnum.TOO_MANY_REQUESTS).json({
        message: 'Too many requests',
    }),
};

module.exports = limiterAPI;
