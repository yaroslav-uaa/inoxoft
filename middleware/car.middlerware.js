const Car = require('../model/Cars');

const ErrorHandler = require('../errors/errorHandler');

const { STATUS_CODES, ERRORS_TEMPLATE } = require('../config');

const isCarIdValid = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const { carId } = req.params;

        const carById = await Car.findOne({
            _id: carId,
            owner: userId,
        });

        if (!carById) {
            throw new ErrorHandler(
                STATUS_CODES.BAD_REQUEST,
                ERRORS_TEMPLATE.CAR_ID_CONFLICT,
            );
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
