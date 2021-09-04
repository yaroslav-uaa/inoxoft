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
    validateMongoId,
    isUserIdValid,
);

router
    .get('/:userId', ctrl.getCurrentUser)
    .delete('/:userId', checkUserRole, ctrl.deleteUserAccount)
    .put('/:userId', checkUserRole, validationUpdate, ctrl.updateUserAccount);

module.exports = router;
