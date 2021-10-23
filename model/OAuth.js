const { Schema, SchemaTypes, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../config');

const OAuthSchema = new Schema(
    {
        owner: {
            type: SchemaTypes.ObjectId,
            ref: dataBaseTablesEnum.OWNER,
            required: true,
        },
        accessToken: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

const OAuth = model(dataBaseTablesEnum.OAUTH, OAuthSchema);

module.exports = OAuth;
