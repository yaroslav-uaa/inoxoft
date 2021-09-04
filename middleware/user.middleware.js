const User = require('../model/users');
const ErrorHandler = require('../errors/errorHandler');

const { BAD_REQUEST, FORBIDDEN } = require('../config/statusCodes.enum');
const { USER_CONFLICT } = require('../config/errorTemplates');

const isUserIdValid = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const userById = await User.findById({ _id: userId });

        if (!userById) {
            throw new ErrorHandler(BAD_REQUEST, USER_CONFLICT);
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
            throw new ErrorHandler(FORBIDDEN, 'Forbidden');
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
