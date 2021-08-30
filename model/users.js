const {
    Schema,
    model
} = require('mongoose');
const bcrypt = require('bcryptjs');

const userRolesEnum = require('../config/user-roler.enum');
const SALT_WORK_FACTOR = 8;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            default: userRolesEnum.USER,
            enum: Object.values(userRolesEnum),
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);
// eslint-disable-next-line func-names
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// eslint-disable-next-line func-names
userSchema.methods.isValidPassword = async function(password) {
    // eslint-disable-next-line no-return-await
    return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;
