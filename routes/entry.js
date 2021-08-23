const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/users')

router.post('/signup', ctrl.register)
router.post('/signin', ctrl.login)

module.exports = router