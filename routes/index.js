module.exports = {
    adminRouter: require('./admin/admin.router'),
    authRouter: require('./auth/auth.router'),
    carsRouter: require('./cars/cars.router'),
    userRouter: require('./users/users.router'),

    authValidator: require('./auth/validation'),
    carsValidator: require('./cars/validation'),
    usersValidator: require('./users/validation'),
};
