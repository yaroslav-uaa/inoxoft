const express = require('express');

const router = express.Router();

const { auth } = require('../../controllers');
const { authMiddleware } = require('../../middleware');
const { validateRegister, validateLogin } = require('./validation');
const { tokenTypes } = require('../../config');

router.post(
    '/signup',
    validateRegister,
    authMiddleware.isEmailExist,
    auth.register,
);
router.post(
    '/verify/:token',
    authMiddleware.checkVerificationToken(tokenTypes.VERIFICATION_TYPE),
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
    authMiddleware.checkAccessToken(tokenTypes.ACCESS_TYPE),
    auth.logout,
);
router.post(
    '/refresh',
    authMiddleware.checkRefreshToken(tokenTypes.REFRESH_TYPE),
    auth.refreshToken,
);

module.exports = router;
