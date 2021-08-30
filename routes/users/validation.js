const Joi = require('joi');

const {
    EMAIL_REGEXP,
    NAME_REGEXP
} = require('../../config/constants');

const updateUserSchema = Joi.object({
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .trim()
        .optional(),
    name: Joi.string()
        .regex(NAME_REGEXP)
        .trim()
        .optional(),
});

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj);
        next();
    } catch (err) {
        next({ message: err.message.replace(/"/g, '') });
    }
};
module.exports = {
    validationUpdate: (req, res, next) => validate(updateUserSchema, req.body, next),
};
