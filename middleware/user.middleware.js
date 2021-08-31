const User = require('../model/users');
const ErrorHandler = require('../errors/errorHandler');

const { BAD_REQUEST } = require('../config/statusCodes.enum');
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

module.exports = {
    isUserIdValid,
};
