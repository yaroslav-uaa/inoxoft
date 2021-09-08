const Joi = require('joi');

const {
    EMAIL_REGEXP,
    PASSWORD_REGEXP,
    NAME_REGEXP,
} = require('../../config/constants');

const registerSchema = Joi.object({
    email: Joi.string().regex(EMAIL_REGEXP).trim().required(),
    password: Joi.string().regex(PASSWORD_REGEXP).trim().required(),
    name: Joi.string().regex(NAME_REGEXP).trim().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().regex(EMAIL_REGEXP).trim().required(),
    password: Joi.string().regex(PASSWORD_REGEXP).trim().required(),
    name: Joi.string().regex(NAME_REGEXP).trim().optional(),
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
    validateRegister: async (req, res, next) => {
        await validate(registerSchema, req.body, next);
    },
    validateLogin: async (req, res, next) => {
        await validate(loginSchema, req.body, next);
    },
};
