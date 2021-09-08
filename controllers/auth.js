const { Users, OAuth } = require('../model');

const { statusCodesEnum, userRolesEnum, constants } = require('../config');
const userNormalize = require('../utils/user.utils');
const { jwtService } = require('../services');

const register = async (req, res, next) => {
    try {
        const user = await new Users({ ...req.body });

        const userToken = jwtService.generateVerificationToken();
        await OAuth.create({ verificationToken: userToken, owner: user._id });

        // first registered user is an admin
        const isFirstUser = (await Users.countDocuments({})) === 0;
        user.role = isFirstUser ? userRolesEnum.ADMIN : userRolesEnum.USER;

        await user.save();

        const normalizedUser = userNormalize(user);
        return res.json({
            normalizedUser,
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
            await OAuth.updateOne(
                { _id: req.token._id },
                { verificationToken: null },
            );
            return res.status(statusCodesEnum.OK).json({
                message: 'Successfully verified, now you can sign in',
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

        await OAuth.updateOne({ owner: user._id }, { ...userTokens });
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

        await OAuth.findOneAndUpdate(
            { accessToken: token },
            { accessToken: null, refreshToken: null },
        );

        res.status(statusCodesEnum.NO_CONTENT).json({
            message: 'Successfully logout',
        });
    } catch (e) {
        next(e);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const { owner } = req.token;

        await OAuth.updateOne({ _id: owner }, { refreshToken: null });

        const userTokens = jwtService.generateUserTokens();

        await OAuth.updateOne({ id: owner }, { ...userTokens });

        res.json({
            ...userTokens,
            user: userNormalize(owner),
        });
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
};
