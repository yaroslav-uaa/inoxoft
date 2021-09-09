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
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
});

const Car = model('car', carSchema);

module.exports = Car;
