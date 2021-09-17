const mongoose = require('mongoose');
const Joi = require('joi');

const { EMAIL_REGEXP, NAME_REGEXP } = require('../../config/constants');
const { BAD_REQUEST } = require('../../config/statusCodes.enum');
const { Sentry } = require('../../logs/Sentry');

const updateUserSchema = Joi.object({
    email: Joi.string().regex(EMAIL_REGEXP).trim().optional(),
    name: Joi.string().regex(NAME_REGEXP).trim().optional(),
});

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
    validationUpdate: (req, res, next) => validate(updateUserSchema, req.body, next),
    validateMongoId: (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
            return next({
                status: BAD_REQUEST,
                message: 'Invalid ObjectId for User',
            });
        }
        next();
    },
};
