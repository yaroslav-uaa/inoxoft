const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../config');

const ActionTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dataBaseTablesEnum.OWNER,
    },
});
const ActionTokens = model(dataBaseTablesEnum.ACTION_TOKEN, ActionTokenSchema);

module.exports = ActionTokens;
