const { Users, OAuth } = require('../model');
const ErrorHandler = require('../errors/errorHandler');

const { statusCodesEnum, errorTemplates, constants } = require('../config');
const { jwtService } = require('../services');

const isEmailExist = async (req, res, next) => {
    try {
        const { email } = req.body;

        const userByEmail = await Users.findOne({ email });

        if (userByEmail) {
            throw new ErrorHandler(
                statusCodesEnum.CONFLICT,
                errorTemplates.EMAIL_CONFLICT,
            );
        }

        next();
    } catch (e) {
        next(e);
    }
};

const isValidUserData = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email });

        const isValidPassword = await user?.isValidPassword(password);

        if (!user || !user.verified || !isValidPassword) {
            throw new ErrorHandler(
                statusCodesEnum.UNAUTHORIZED,
                errorTemplates.INCORRECT,
            );
        }

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};

const checkVerificationToken = (tokenType) => async (req, res, next) => {
    try {
        const { token } = req.params;

        const dbToken = await OAuth.findOne({ verificationToken: token });

        if (!dbToken) {
            throw new ErrorHandler(
                statusCodesEnum.NOT_FOUND,
                errorTemplates.TOKEN_CONFLICT,
            );
        }

        await jwtService.verifyToken(dbToken.verificationToken, tokenType);

        req.token = dbToken;

        next();
    } catch (e) {
        next(e);
    }
};

const checkAccessToken = (tokenType) => async (req, res, next) => {
    try {
        const token = req.get(constants.AUTH);

        if (!token) {
            throw new ErrorHandler(
                statusCodesEnum.NOT_FOUND,
                errorTemplates.TOKEN_CONFLICT,
            );
        }

        await jwtService.verifyToken(token, tokenType);

        const dbToken = await OAuth.findOne({ accessToken: token });

        if (!dbToken) {
            throw new ErrorHandler(
                statusCodesEnum.NOT_FOUND,
                errorTemplates.TOKEN_CONFLICT,
            );
        }

        req.token = dbToken;

        next();
    } catch (e) {
        next(e);
    }
};

const checkRefreshToken = (tokenType) => async (req, res, next) => {
    try {
        const token = req.get(constants.AUTH);

        if (!token) {
            throw new ErrorHandler(
                statusCodesEnum.NOT_FOUND,
                errorTemplates.TOKEN_CONFLICT,
            );
        }

        await jwtService.verifyToken(token, tokenType);

        const dbToken = await OAuth.findOne({ refreshToken: token });

        if (!dbToken) {
            throw new ErrorHandler(
                statusCodesEnum.NOT_FOUND,
                errorTemplates.TOKEN_CONFLICT,
            );
        }

        req.token = dbToken;

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    checkAccessToken,
    checkRefreshToken,
    checkVerificationToken,
    isEmailExist,
    isValidUserData,
};
