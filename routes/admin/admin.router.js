const router = require('express').Router();

const { admin } = require('../../controllers');
const {
    authMiddleware,
    userMiddleware,
    fileMiddleware,
} = require('../../middleware');
const { validateCreate } = require('./validation');
const { userRolesEnum } = require('../../config');

router.post(
    '/',
    validateCreate,
    authMiddleware.isEmailExist,
    fileMiddleware.checkUserAvatar,
    userMiddleware.checkUserRole([userRolesEnum.SUPER_ADMIN]),
    admin.createAdmin,
);

module.exports = router;
