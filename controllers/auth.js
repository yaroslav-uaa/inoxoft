const User = require('../model/users');
const userNormalize = require('../utils/user.utils');

const register = async (req, res, next) => {
    try {
        const user = await User.create({ ...req.body });

        const normalizedUser = userNormalize(user);
        return res.json({
            normalizedUser,
        });
    } catch (e) {
        next(e);
    }
};

const login = (req, res, next) => {
    try {
        return res.json({
            message: 'You have been logged in successfully',
        });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    register,
    login,
};
