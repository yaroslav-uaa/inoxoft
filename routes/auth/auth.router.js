const router = require('express').Router();

const { auth } = require('../../controllers');
const { authMiddleware, userMiddleware } = require('../../middleware');
const {
    validateRegister,
    validateLogin,
    validateForgotPass,
    validateResetPass,
} = require('./validation');
const { actionTypes, tokenTypes } = require('../../config');

router.post(
    '/signup',
    validateRegister,
    authMiddleware.isEmailExist,
    auth.register,
);

router.post(
    '/verify/:token',
    authMiddleware.checkActionToken(actionTypes.VERIFICATION_TYPE),
    auth.verify,
);

router.post(
    '/signin',
    validateLogin,
    authMiddleware.isValidUserData,
    auth.login,
);

router.post(
    '/signout',
    authMiddleware.checkUserToken(actionTypes.ACCESS_TYPE, tokenTypes.ACCESS),
    auth.logout,
);

router.post(
    '/refresh',
    authMiddleware.checkUserToken(actionTypes.REFRESH_TYPE, tokenTypes.REFRESH),
    auth.refreshToken,
);

router.post(
    '/forgot-password',
    validateForgotPass,
    userMiddleware.getUserByDynamicParam('email'),
    auth.forgotPassword,
);

router.post(
    '/reset-password',
    validateResetPass,
    authMiddleware.checkActionToken(actionTypes.RESET_TYPE),
    auth.resetPassword,
);

module.exports = router;
