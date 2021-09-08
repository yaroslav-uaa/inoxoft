const express = require('express');

const router = express.Router();

const { users } = require('../../controllers');

const { validationUpdate, validateMongoId } = require('./validation');
const { authMiddleware, userMiddleware } = require('../../middleware');
const { tokenTypes, userRolesEnum } = require('../../config');

router.get(
    '/',
    authMiddleware.checkAccessToken(tokenTypes.ACCESS_TYPE),
    users.getAllUsers,
);

router.use(
    '/:userId',
    userMiddleware.getUserByDynamicParam('userId', 'params', '_id'),
    validateMongoId,
    userMiddleware.isUserIdValid,
    authMiddleware.checkAccessToken(tokenTypes.ACCESS_TYPE),
);

router
    .get('/:userId', users.getCurrentUser)
    .delete(
        '/:userId',
        userMiddleware.checkUserRole([userRolesEnum.ADMIN]),
        users.deleteUserAccount,
    )
    .put(
        '/:userId',
        userMiddleware.checkUserRole([userRolesEnum.ADMIN]),
        validationUpdate,
        users.updateUserAccount,
    );

module.exports = router;
