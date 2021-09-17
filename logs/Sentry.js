const Sentry = require('@sentry/node');

const { SENTRY_DSN } = require('../config/configs');

Sentry.init({ dsn: SENTRY_DSN });

module.exports = {
    Sentry,
};
