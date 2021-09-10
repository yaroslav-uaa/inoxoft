const User = require('../model/Users');

const userNormalize = require('../utils/user.utils');
const { cloudUpload } = require('../services');
const { statusCodesEnum } = require('../config');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select('-password');

        res.json({
            users,
        });
    } catch (e) {
        next(e);
    }
};

const getCurrentUser = (req, res, next) => {
    try {
        const { user } = req;
        const normalizedUser = userNormalize(user);

        res.json({
            normalizedUser,
        });
    } catch (e) {
        next(e);
    }
};

const deleteUserAccount = async (req, res, next) => {
    try {
        await User.findByIdAndDelete({ _id: req.params.userId });

        res.json({
            message: 'Delete successfully',
        });
    } catch (e) {
        next(e);
    }
};
const updateUserAccount = async (req, res, next) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { ...req.body },
            { new: true },
        );
        const normalizedUser = userNormalize(user);

        res.json({
            normalizedUser,
        });
    } catch (e) {
        next(e);
    }
};

const uploadAvatar = async (req, res, next) => {
    try {
        const { avatar } = req.files;
        let { user } = req;

        if (avatar) {
            const { _id } = user;
            const uploadFile = await cloudUpload.upload(avatar, 'user', _id);

            user = await User.findByIdAndUpdate(
                _id,
                { avatar: uploadFile.Location },
                { new: true },
            );
        }
        res.status(statusCodesEnum.OK).json({
            user,
        });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getAllUsers,
    getCurrentUser,
    deleteUserAccount,
    updateUserAccount,
    uploadAvatar,
};
