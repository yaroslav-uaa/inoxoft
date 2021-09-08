const { Schema, SchemaTypes, model } = require('mongoose');

const OAuthSchema = new Schema(
    {
        owner: {
            type: SchemaTypes.ObjectId,
            ref: 'user',
            required: true,
        },
        accessToken: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
        verificationToken: {
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

const OAuth = model('oauth', OAuthSchema);

module.exports = OAuth;
