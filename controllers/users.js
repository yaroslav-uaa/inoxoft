const {
    findAllUsers,
    deleteUser,
    updateUser,
} = require('../repositories/users');
const userNormalize = require('../utils/user.utils');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await findAllUsers();

        res.json({
            users,
        });
    } catch (e) {
        next(e);
    }
};

// eslint-disable-next-line require-await
const getCurrentUser = async (req, res, next) => {
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
        await deleteUser(req.params.userId);

        res.json({
            message: 'Delete successfully',
        });
    } catch (e) {
        next(e);
    }
};
const updateUserAccount = async (req, res, next) => {
    try {
        const user = await updateUser(req.params.userId, req.body);
        const normalizedUser = userNormalize(user);

        res.json({
            normalizedUser,
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
};
