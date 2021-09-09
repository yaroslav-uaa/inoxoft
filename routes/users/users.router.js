const router = require('express').Router();

const { users } = require('../../controllers');

const { validationUpdate, validateMongoId } = require('./validation');
const { authMiddleware, userMiddleware } = require('../../middleware');
const { tokenTypes, userRolesEnum, actionTypes } = require('../../config');

router.get(
    '/',
    authMiddleware.checkUserToken(actionTypes.ACCESS_TYPE, tokenTypes.ACCESS),
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
