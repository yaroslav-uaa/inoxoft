require('dotenv').config();

const app = require('./app');
const db = require('./model/db');

const { PORT } = process.env;

db.then(() => {
    app.listen(PORT, () => {
        // eslint-disable-next-line no-unused-expressions
        `Server running. Use our API on ${PORT}`;
    });
}).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(`error: ${err.message}`);
});
