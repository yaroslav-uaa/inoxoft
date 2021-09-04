const express = require('express');

const { authRouter, carsRouter, userRouter } = require('./routes/index');

const _mainErrorHandler = require('./errors/mainErrorHandler');

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/cars', carsRouter);

app.use(_mainErrorHandler);

module.exports = app;
