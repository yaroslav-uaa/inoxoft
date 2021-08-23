const express = require('express')
const expressHbs = require('express-handlebars')
const path = require('path')

const {PORT} = require('./config/config')
const {NOT_FOUND} = require('./config/statusCodes.enum')
const entryRouter = require('./routes/entry')
const userRouter = require('./routes/users')
const viewsRouter = require('./views/views')

const app = express();
const staticPath = path.join(__dirname, 'static')

app.use(express.urlencoded({extended: true}))
app.use(express.static(staticPath))

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}))
app.set('views', staticPath)
app.use(express.json())

app.use('/', entryRouter)
app.use('/users', userRouter)
app.use('/', viewsRouter)

app.use((req, res) => {
    res.render('error', {status: 'error', code: NOT_FOUND, message: 'Not found'})
})

app.listen(PORT, () => {
    console.log('App listen', PORT)
})