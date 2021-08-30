const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/auth');
const {
    isEmailExist,
    isValidUserData,
} = require('../../middleware/auth.middleware');
const {
    validateRegister,
    validateLogin
} = require('./validation');

router.post('/signup', validateRegister, isEmailExist, ctrl.register);
router.post('/signin', validateLogin, isValidUserData, ctrl.login);

module.exports = router;
