const User = require('../model/Users');
const ErrorHandler = require('../errors/errorHandler');

const { statusCodesEnum, errorTemplates } = require('../config');

const isUserIdValid = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const userById = await User.findById({ _id: userId });

        if (!userById) {
            throw new ErrorHandler(
                statusCodesEnum.BAD_REQUEST,
                errorTemplates.USER_CONFLICT,
            );
        }

        req.user = userById;

        next();
    } catch (e) {
        next(e);
    }
};

// prettier-ignore
const checkUserRole = (roleArr = []) => (req, res, next) => {
    try {
        const { role } = req.user;

        if (!roleArr.length) {
            return next();
        }

        if (!roleArr.includes(role)) {
            throw new ErrorHandler(statusCodesEnum.FORBIDDEN, 'Forbidden');
        }

        next();
    } catch (e) {
        next(e);
    }
};

// prettier-ignore
const getUserByDynamicParam = (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
    try {
        const value = req[searchIn][paramName];

        const user = await User.findOne({ [dbField]: value });

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    isUserIdValid,
    checkUserRole,
    getUserByDynamicParam,
};
