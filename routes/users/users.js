const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/users');

const { isUserIdValid } = require('../../middleware/user.middleware');
const { validationUpdate } = require('./validation');

router.get('/', ctrl.getAllUsers);
router
    .get('/:userId', isUserIdValid, ctrl.getCurrentUser)
    .delete('/:userId', isUserIdValid, ctrl.deleteUserAccount)
    .put('/:userId', validationUpdate, isUserIdValid, ctrl.updateUserAccount);

module.exports = router;
