const { Schema, SchemaTypes, model } = require('mongoose');

const carSchema = new Schema({
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
        trim: true,
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    dateCreate: {
        type: Date,
        default: Date.now(),
    },
    description: {
        type: String,
    },
    avatar: {
        type: String,
    },
    idCloudAvatar: {
        type: String,
        default: null,
    },
});

const Car = model('car', carSchema);

module.exports = Car;
