const { statusCodesEnum } = require('../config');

const limiterAPI = {
    windowMs: 60 * 60 * 10000,
    max: 400000,
    handler: (req, res) =>
        res.status(statusCodesEnum.TOO_MANY_REQUESTS).json({
            message: 'Too many requests',
        }),
};

module.exports = limiterAPI;
