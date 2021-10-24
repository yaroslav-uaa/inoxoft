const Joi = require('joi');
const mongoose = require('mongoose');

const { constants, statusCodesEnum } = require('../../config');
const { Sentry } = require('../../logs/Sentry');

const createCarSchema = Joi.object({
    brand: Joi.string().min(3).max(30).required(),
    model: Joi.string().min(2).max(30).required(),
    year: Joi.number().min(1900).max(constants.CURRENT_YEAR).required(),
    avatar: Joi.string().min(3).max(700).optional(),
    description: Joi.string().min(3).max(7000).optional(),
    favorite: Joi.boolean().optional(),
});

const updateCarSchema = Joi.object({
    brand: Joi.string().min(3).max(30).optional(),
    model: Joi.string().min(2).max(30).optional(),
    year: Joi.number().min(1900).max(constants.CURRENT_YEAR).optional(),
});

// const updateFavorites = Joi.object({
//     favorite: Joi.boolean().required(),
// });

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj);
        next();
    } catch (err) {
        Sentry.captureException(err);
        next({ message: err.message.replace(/"/g, '') });
    }
};

module.exports = {
    validateCreateCar: (req, res, next) =>
        validate(createCarSchema, req.body, next),
    validateUpdateCar: (req, res, next) =>
        validate(updateCarSchema, req.body, next),
    // validateUpdateFavorites: (req, res, next) => validate(updateFavorites, req.body, next),
    validateMongoId: (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.carId)) {
            return next({
                status: statusCodesEnum.BAD_REQUEST,
                message: 'Invalid ObjectId',
            });
        }
        next();
    },
};
