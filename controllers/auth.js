const { Users, OAuth, ActionTokens } = require('../model');

const { statusCodesEnum, userRolesEnum, constants } = require('../config');
const userNormalize = require('../utils/user.utils');
const { jwtService, EmailService, CreateSender } = require('../services');

const register = async (req, res, next) => {
    try {
        const user = await new Users({ ...req.body });

        const userToken = jwtService.generateVerificationToken();

        await ActionTokens.create({ token: userToken, owner: user._id });

        // first registered user is an admin
        const isFirstUser = (await Users.countDocuments({})) === 0;
        user.role = isFirstUser
            ? userRolesEnum.SUPER_ADMIN
            : userRolesEnum.USER;

        await user.save();

        try {
            const emailService = new EmailService(new CreateSender());

            await emailService.sendVerificationEmail(userToken, user.email);
        } catch (e) {
            next(e);
        }

        const normalizedUser = userNormalize(user);
        return res.json({
            normalizedUser,
            message:
                "Registration successful, please check your email for verification instructions'",
        });
    } catch (e) {
        next(e);
    }
};

const verify = async (req, res, next) => {
    try {
        const { owner } = req.token;

        if (req.token) {
            await Users.updateOne({ _id: owner }, { verified: true });
            await ActionTokens.deleteOne({ _id: req.token._id });

            return res.status(statusCodesEnum.OK).json({
                message: 'Verification successful, you can now login',
            });
        }
        return res
            .status(statusCodesEnum.CONFLICT)
            .json({ message: 'Verification Failed' });
    } catch (e) {
        next(e);
    }
};

const login = async (req, res, next) => {
    try {
        const { user } = req;

        const userTokens = jwtService.generateUserTokens();

        await OAuth.create({ owner: user._id, ...userTokens });
        return res.json({
            ...userTokens,
            user: userNormalize(user),
        });
    } catch (e) {
        next(e);
    }
};

const logout = async (req, res, next) => {
    try {
        const token = req.get(constants.AUTH);

        await OAuth.deleteOne({ accessToken: token });

        res.status(statusCodesEnum.NO_CONTENT).json({
            message: 'Successfully logout',
        });
    } catch (e) {
        next(e);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const token = req.get(constants.AUTH);
        const { owner } = req.token;

        await OAuth.deleteOne({ refreshToken: token });

        const userTokens = jwtService.generateUserTokens();

        await OAuth.create({ owner, ...userTokens });

        res.json({
            ...userTokens,
            user: userNormalize(owner),
        });
    } catch (e) {
        next(e);
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const { user } = req;

        const resetToken = jwtService.generateResetToken();

        await ActionTokens.create({ owner: user._id, token: resetToken });

        try {
            const emailService = new EmailService(new CreateSender());

            await emailService.sendResetPasswordEmail(resetToken, user.email);
        } catch (e) {
            next(e);
        }
        return res.json({
            message: 'Please check your email for password reset instructions',
        });
    } catch (e) {
        next(e);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        const { token, owner } = req.token;

        const user = await Users.findById(owner);

        user.password = password;
        user.passwordReset = new Date();
        await user.save();

        await ActionTokens.deleteOne({ token });

        await OAuth.deleteOne({ owner });

        res.json({ message: 'Password reset successful, you can now login' });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    register,
    verify,
    login,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
};
