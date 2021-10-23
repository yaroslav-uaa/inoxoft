const User = require('../model/Users');
const fs = require('fs/promises');

const userNormalize = require('../utils/user.utils');
const { UploadService } = require('../services');
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
        const { path } = req.file;

        const uploads = new UploadService();

        const { idCloudAvatar, avatarURL } = await uploads.saveAvatar(
            path,
            req.user.idCloudAvatar,
        );

        await fs.unlink(path);

        const user = await User.updateOne(
            { _id: req.params.userId },
            { avatar: avatarURL, idCloudAvatar },
            { new: true },
        );
        res.json({ user });
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
