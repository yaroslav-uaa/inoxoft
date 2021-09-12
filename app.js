const express = require('express');
const expressFileUpload = require('express-fileupload');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const {
    authRouter, carsRouter, userRouter, adminRouter
} = require('./routes');

const _mainErrorHandler = require('./errors/mainErrorHandler');
const { _configureCors } = require('./helpers/cors.configs');
const { limiterAPI } = require('./config/constants');

const app = express();

const formatLogger = app.get('env') === 'developmet' ? 'dev' : 'short';

app.use(helmet());
app.use(express.json());
app.use(expressFileUpload({}));
app.use(logger(formatLogger));
app.use(cors({ origin: _configureCors }));

app.use(express.urlencoded({ extended: true }));

app.use(rateLimit(limiterAPI));
app.use('/', authRouter);
app.use('/admin', adminRouter);
app.use('/users', userRouter);
app.use('/cars', carsRouter);

app.use(_mainErrorHandler);

module.exports = app;
