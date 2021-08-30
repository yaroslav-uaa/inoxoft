const { findCarById } = require('../repositories/cars');

const ErrorHandler = require('../errors/errorHandler');

const { BAD_REQUEST } = require('../config/statusCodes.enum');
const { CAR_ID_CONFLICT } = require('../config/errorTemplates');

const isCarIdValid = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const carById = await findCarById(userId, req.params.carId);

        if (!carById) {
            throw new ErrorHandler(BAD_REQUEST, CAR_ID_CONFLICT);
        }
        req.car = carById;

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    isCarIdValid,
};
