const { statusCodesEnum } = require('../config');

const limiterAPI = {
    windowMs: 15 * 60 * 1000,
    max: 1000,
    handler: (req, res) => res
        .status(statusCodesEnum.TOO_MANY_REQUESTS)
        .json({ message: 'Too many requests' }),
};

module.exports = limiterAPI;
