const Joi = require('joi');

const { constants } = require('../../config');
const { Sentry } = require('../../logs/Sentry');

const registerSchema = Joi.object({
    email: Joi.string().regex(constants.EMAIL_REGEXP).trim().required(),
    password: Joi.string().regex(constants.PASSWORD_REGEXP).trim().required(),
    name: Joi.string().regex(constants.NAME_REGEXP).trim().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().regex(constants.EMAIL_REGEXP).trim().required(),
    password: Joi.string().regex(constants.PASSWORD_REGEXP).trim().required(),
    name: Joi.string().regex(constants.NAME_REGEXP).trim().optional(),
});

const forgotPassSchema = Joi.object({
    email: Joi.string().regex(constants.EMAIL_REGEXP).trim().required(),
});

const resetPassSchema = Joi.object({
    password: Joi.string().regex(constants.PASSWORD_REGEXP).trim().required(),
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
    validateRegister: async (req, res, next) => {
        await validate(registerSchema, req.body, next);
    },
    validateLogin: async (req, res, next) => {
        await validate(loginSchema, req.body, next);
    },
    validateForgotPass: async (req, res, next) => {
        await validate(forgotPassSchema, req.body, next);
    },
    validateResetPass: async (req, res, next) => {
        await validate(resetPassSchema, req.body, next);
    },
};
