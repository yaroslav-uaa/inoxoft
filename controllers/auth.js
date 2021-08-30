const { createUser } = require('../repositories/users');

const register = async (req, res, next) => {
    try {
        const user = await createUser(req.body);

        return res.json({
            user,
        });
    } catch (e) {
        next(e);
    }
};

// eslint-disable-next-line require-await
const login = async (req, res, next) => {
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
