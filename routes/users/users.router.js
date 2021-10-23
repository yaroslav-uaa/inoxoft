const router = require('express').Router();

const { users } = require('../../controllers');

const { validationUpdate, validateMongoId } = require('./validation');
const { authMiddleware, userMiddleware } = require('../../middleware');
const { tokenTypes, userRolesEnum, actionTypes } = require('../../config');
const upload = require('../../helpers/upload');

router.get(
    '/',
    authMiddleware.checkUserToken(actionTypes.ACCESS_TYPE, tokenTypes.ACCESS),
    userMiddleware.getUserByDynamicParam('userId', 'token', 'owner'),
    userMiddleware.checkUserRole([
        userRolesEnum.SUPER_ADMIN,
        userRolesEnum.ADMIN,
    ]),
    users.getAllUsers,
);

router.use(
    '/:userId',
    userMiddleware.getUserByDynamicParam('userId', 'params', '_id'),
    validateMongoId,
    userMiddleware.isUserIdValid,
    authMiddleware.checkUserToken(actionTypes.ACCESS_TYPE, tokenTypes.ACCESS),
);

router
    .get('/:userId', users.getCurrentUser)
    .delete(
        '/:userId',
        userMiddleware.checkUserRole([
            userRolesEnum.SUPER_ADMIN,
            userRolesEnum.ADMIN,
        ]),
        users.deleteUserAccount,
    )
    .put(
        '/:userId',
        userMiddleware.checkUserRole([
            userRolesEnum.SUPER_ADMIN,
            userRolesEnum.ADMIN,
        ]),
        validationUpdate,
        users.updateUserAccount,
    )
    .patch(
        '/:userId/avatars',
        authMiddleware.checkUserToken(
            actionTypes.ACCESS_TYPE,
            tokenTypes.ACCESS,
        ),
        upload.single('avatar'),
        users.uploadAvatar,
    );

module.exports = router;
