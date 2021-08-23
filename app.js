const express = require('express')
const expressHbs = require('express-handlebars')
const path = require('path')

const {PORT} = require('./config/config')
const userRouter = require('./routes/users')
const ctrl = require("./controllers/users");

const app = express();
const staticPath = path.join(__dirname, 'static')


app.use(express.urlencoded({extended: true}))
app.use(express.static(staticPath))

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}))
app.set('views', staticPath)
app.use(express.json())

app.use('/users', userRouter)
app.post('/signup', ctrl.register)
app.post('/signin', ctrl.login)


//Render endpoints
app.get('/register', (req, res, next) => {
    res.render('register')
})
app.get('/login', (req, res, next) => {
    res.render('login')
})
app.get('/main', (req, res, next) => {
    res.render('main')
})
app.get('/userlist', (req, res, next) => {
    res.render('userlist')
})

app.use((req, res) => {
    res.status(404).json({status: 'error', code: 404, message: 'Not found'})
})

app.listen(PORT, () => {
    console.log('App listen', PORT)
})