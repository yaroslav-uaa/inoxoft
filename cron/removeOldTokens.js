const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const { OAuth, ActionTokens } = require('../model');

module.exports = async () => {
    const previousMonth = dayjs.utc('2021-09-15').subtract(1, 'month');

    console.log(previousMonth);

    await OAuth.deleteMany({ createdAt: { $lte: previousMonth } });
    await ActionTokens.deleteMany({ createdAt: { $lte: previousMonth } });
};
