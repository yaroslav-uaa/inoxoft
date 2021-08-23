const express = require('express')
const router = express.Router()

//Render endpoints
router.get('/register', (req, res, next) => {
    res.render('register')
})
router.get('/login', (req, res, next) => {
    res.render('login')
})
router.get('/main', (req, res, next) => {
    res.render('main')
})
router.get('/userlist', (req, res, next) => {
    res.render('userlist')
})
router.get('/error', (req, res, next) => {
    res.render('error', {code, message})
})

module.exports = router