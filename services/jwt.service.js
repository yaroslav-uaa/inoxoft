const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/errorHandler');
const { statusCodesEnum, configs, errorTemplates } = require('../config');

const generateUserTokens = () => {
    const accessToken = jwt.sign({}, configs.SECRET_KEY_ACCESS, {
        expiresIn: '15m',
    });
    const refreshToken = jwt.sign({}, configs.SECRET_KEY_REFRESH, {
        expiresIn: '31d',
    });

    return {
        accessToken,
        refreshToken,
    };
};

const generateVerificationToken = () => jwt.sign({}, configs.SECRET_KEY_VERIFICATION, {
    expiresIn: '7d',
});

const generateResetToken = () => jwt.sign({}, configs.SECRET_KEY_RESET, { expiresIn: '7d' });

const verifyToken = (token, actionType) => {
    try {
        let secret = '';
        switch (actionType) {
            case 'access':
                secret = configs.SECRET_KEY_ACCESS;
                break;
            case 'refresh':
                secret = configs.SECRET_KEY_REFRESH;
                break;
            case 'reset':
                secret = configs.SECRET_KEY_RESET;
                break;
            case 'verification':
                secret = configs.SECRET_KEY_VERIFICATION;
                break;
            default:
                throw new ErrorHandler(
                    statusCodesEnum.CONFLICT,
                    errorTemplates.TOKEN_TYPE,
                );
        }
        jwt.verify(token, secret);
    } catch (e) {
        throw new ErrorHandler(
            statusCodesEnum.CONFLICT,
            errorTemplates.INVALID_TOKEN,
        );
    }
};

module.exports = {
    generateUserTokens,
    generateVerificationToken,
    generateResetToken,
    verifyToken,
};
