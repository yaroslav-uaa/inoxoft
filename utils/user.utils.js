const userNormalize = (userToNormalize) => {
    const filedToNormalize = ['password'];

    // eslint-disable-next-line no-param-reassign
    userToNormalize = userToNormalize.toJSON();

    filedToNormalize.forEach((filed) => {
        // eslint-disable-next-line no-param-reassign
        delete userToNormalize[filed];
    });
    return userToNormalize;
};

module.exports = userNormalize;
