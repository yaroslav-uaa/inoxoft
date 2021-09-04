const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/users');

const {
    isUserIdValid,
    getUserByDynamicParam,
    checkUserRole,
} = require('../../middleware/user.middleware');
const { validationUpdate, validateMongoId } = require('./validation');

router.get('/', ctrl.getAllUsers);

router.use(
    '/:userId',
    getUserByDynamicParam('userId', 'params', '_id'),
    isUserIdValid,
);

router
    .get('/:userId', validateMongoId, isUserIdValid, ctrl.getCurrentUser)
    .delete(
        '/:userId',
        checkUserRole,
        validateMongoId,
        isUserIdValid,
        ctrl.deleteUserAccount,
    )
    .put(
        '/:userId',
        checkUserRole,
        validateMongoId,
        validationUpdate,
        isUserIdValid,
        ctrl.updateUserAccount,
    );

module.exports = router;
