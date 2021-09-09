const { Users, OAuth, ActionTokens } = require('../model');
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

const checkUserToken = (actionType, tokenType) => async (req, res, next) => {
    try {
        const token = req.get(constants.AUTH);

        if (!token) {
            throw new ErrorHandler(
                statusCodesEnum.NOT_FOUND,
                errorTemplates.TOKEN_CONFLICT,
            );
        }

        await jwtService.verifyToken(token, actionType);

        const dbToken = await OAuth.findOne({ [tokenType]: token });

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

const checkActionToken = (actionType) => async (req, res, next) => {
    try {
        const token = req.get(constants.AUTH);

        const dbToken = await ActionTokens.findOne({ token });

        if (!dbToken) {
            throw new ErrorHandler(
                statusCodesEnum.NOT_FOUND,
                errorTemplates.TOKEN_CONFLICT,
            );
        }

        await jwtService.verifyToken(dbToken.token, actionType);

        req.token = dbToken;

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    checkUserToken,
    checkActionToken,
    isEmailExist,
    isValidUserData,
};
