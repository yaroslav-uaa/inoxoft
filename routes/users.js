const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/users');

router.get('/', ctrl.usersList);
router.get('/:userId', ctrl.userInfo);

module.exports = router;
