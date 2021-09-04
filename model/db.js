const mongoose = require('mongoose');
require('dotenv').config();

const uriDb = process.env.URL_DB;

const db = mongoose.connect(uriDb);

mongoose.connection.on('connected', () => {
    // eslint-disable-next-line no-console
    console.log(`Connection open ${uriDb}`);
});

mongoose.connection.on('error', (e) => {
    // eslint-disable-next-line no-unused-expressions
    `Connection has ${e.message}`;
});

// eslint-disable-next-line no-unused-vars
mongoose.connection.on('disconnect', (e) => {
    // eslint-disable-next-line no-console
    console.log('Mongoose disconnected');
});

// eslint-disable-next-line require-await
process.on('SIGINT', async () => {
    mongoose.connection.close(() => {
        // eslint-disable-next-line no-console
        console.log('Connection to DB terminated');
        process.exit(1);
    });
});

module.exports = db;
