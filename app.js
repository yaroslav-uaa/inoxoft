const express = require('express');
const expressFileUpload = require('express-fileupload');

require('dotenv').config();

const {
    authRouter, carsRouter, userRouter, adminRouter
} = require('./routes');

const _mainErrorHandler = require('./errors/mainErrorHandler');

const app = express();
app.use(express.json());
app.use(expressFileUpload({}));

app.use(express.urlencoded({ extended: true }));
app.use('/', authRouter);
app.use('/admin', adminRouter);
app.use('/users', userRouter);
app.use('/cars', carsRouter);

app.use(_mainErrorHandler);

module.exports = app;
