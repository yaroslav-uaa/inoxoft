const { findUserByEmail } = require('../repositories/users');
const ErrorHandler = require('../errors/errorHandler');

const {
    CONFLICT,
    UNAUTHORIZED
} = require('../config/statusCodes.enum');
const {
    EMAIL_CONFLICT,
    INCORRECT
} = require('../config/errorTemplates');

const isEmailExist = async (req, res, next) => {
    try {
        const { email } = req.body;

        const userByEmail = await findUserByEmail(email);
        if (userByEmail) {
            throw new ErrorHandler(CONFLICT, EMAIL_CONFLICT);
        }

        next();
    } catch (e) {
        next(e);
    }
};

const isValidUserData = async (req, res, next) => {
    try {
        const user = await findUserByEmail(req.body.email);

        const isValidPassword = await user?.isValidPassword(req.body.password);

        if (!user || !isValidPassword) {
            throw new ErrorHandler(UNAUTHORIZED, INCORRECT);
        }
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    isEmailExist,
    isValidUserData,
};
