const express = require('express');
const path = require('path');

const entryRouter = require('./routes/entry');
const userRouter = require('./routes/users');

const { PORT } = require('./config/config');
const { NOT_FOUND } = require('./config/statusCodes.enum');

const app = express();
const staticPath = path.join(__dirname, 'static');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));

app.use(express.json());

app.use('/', entryRouter);
app.use('/users', userRouter);

app.use((req, res) => {
    res.status(NOT_FOUND).json({
        status: 'error',
        code: NOT_FOUND,
        message: 'sh*t happens',
    });
});

app.listen(PORT, () => {
    console.log('App listen', PORT);
});
