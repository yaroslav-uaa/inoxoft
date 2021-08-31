const Car = require('../model/cars');

const ErrorHandler = require('../errors/errorHandler');

const { BAD_REQUEST } = require('../config/statusCodes.enum');
const { CAR_ID_CONFLICT } = require('../config/errorTemplates');

const isCarIdValid = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const { carId } = req.params;

        const carById = await Car.findOne({
            _id: carId,
            owner: userId,
        });

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
