const { INTERNAL_SERVER_ERROR } = require('../config/statusCodes.enum');

// eslint-disable-next-line no-unused-vars
const _mainErrorHandler = (err, req, res, next) => {
    res.status(err.status || INTERNAL_SERVER_ERROR).json({
        message: err.message || 'Unknown error',
        data: err.data,
    });
};

module.exports = _mainErrorHandler;
