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

const generateVerificationToken = () => {
    const verificationToken = jwt.sign({}, configs.SECRET_KEY_VERIFICATION, {
        expiresIn: '7d',
    });
    return verificationToken;
};

const verifyToken = (token, tokenType) => {
    try {
        let secret = '';

        switch (tokenType) {
            case 'access':
                secret = configs.SECRET_KEY_ACCESS;
                break;
            case 'verification':
                secret = configs.SECRET_KEY_VERIFICATION;
                break;
            case 'refresh':
                secret = configs.SECRET_KEY_REFRESH;
                break;
            default:
                throw new ErrorHandler(
                    statusCodesEnum.CONFLICT,
                    errorTemplates.TOKEN_TYPE,
                );
        }
        console.log(secret);

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
    verifyToken,
};
