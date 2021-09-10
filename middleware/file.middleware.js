const { constants, statusCodesEnum } = require('../config');
const ErrorHandler = require('../errors/errorHandler');

const checkUserAvatar = (req, res, next) => {
    try {
        const { avatar } = req.files;

        if (!avatar) {
            next();
            return;
        }

        const { name, size } = avatar;

        if (size > constants.MAX_AVATAR_SIZE) {
            throw new ErrorHandler(
                statusCodesEnum.BAD_REQUEST,
                `File ${name} is too big`,
            );
        }
        next();
    } catch (e) {
        next(e);
    }
};
module.exports = {
    checkUserAvatar,
};
