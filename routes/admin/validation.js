const Joi = require('joi');

const { constants } = require('../../config');
const { Sentry } = require('../../logs/Sentry');

const createAdminSchema = Joi.object({
    email: Joi.string().regex(constants.EMAIL_REGEXP).trim().required(),
    password: Joi.string().regex(constants.PASSWORD_REGEXP).trim().required(),
    name: Joi.string().regex(constants.NAME_REGEXP).trim().required(),
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
    validateCreate: async (req, res, next) => {
        await validate(createAdminSchema, req.body, next);
    },
};
