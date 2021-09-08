module.exports = {
    authRouter: require('./auth/auth'),
    carsRouter: require('./cars/cars'),
    userRouter: require('./users/users'),

    authValidator: require('./auth/validation'),
    carsValidator: require('./cars/validation'),
    usersValidator: require('./users/validation'),
};
