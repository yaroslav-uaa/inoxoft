const {
    getUserInfo,
    getUserByEmail,
    addUser,
    readData,
} = require('../repositories/users');
const HttpCode = require('../config/statusCodes.enum');

const register = async (req, res, next) => {
    try {
        const user = await getUserByEmail(req.body.email);
        if (user) {
            return res.status(HttpCode.CONFLICT).json({
                status: 'error',
                code: HttpCode.CONFLICT,
                message: 'Email is already used',
            });
        }

        const { id, email, password } = await addUser(req.body);

        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            message: 'You registered successfully',
            user: {
                id,
                email,
                password,
            },
        });
    } catch (e) {
        next(e);
    }
};

const login = async (req, res, next) => {
    try {
        const user = await getUserByEmail(req.body.email);
        const isValidPassword = user?.password === req.body.password;

        if (!user || !isValidPassword) {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'unauthorized',
                code: HttpCode.UNAUTHORIZED,
                message: 'invalid login or password',
            });
        }

        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            message: 'You have been logged in successfully',
        });
    } catch (e) {
        next(e);
    }
};

const usersList = async (req, res, next) => {
    try {
        const users = await readData();

        res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: [users],
        });
    } catch (e) {
        next(e);
    }
};

const userInfo = async (req, res, next) => {
    try {
        const user = await getUserInfo(req.params.userId);
        if (!user) {
            res.status(HttpCode.NOT_FOUND).json({
                status: 'error',
                code: HttpCode.NOT_FOUND,
                message: 'User not found',
            });
        }

        const { id, email, password } = user;

        res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                id,
                email,
                password,
            },
        });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    register,
    login,
    usersList,
    userInfo,
};
