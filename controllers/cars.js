const {
    findAllCars,
    createCar,
    deleteCar,
    updateCar,
} = require('../repositories/cars');

const getAll = async (req, res, next) => {
    try {
        const { userId } = req.query;

        const cars = await findAllCars(userId);
        res.json({
            cars,
        });
    } catch (e) {
        next(e);
    }
};

// eslint-disable-next-line require-await
const getThis = async (req, res, next) => {
    try {
        const { car } = req;

        res.json({ car });
    } catch (e) {
        next(e);
    }
};

const add = async (req, res, next) => {
    try {
        const { userId } = req.query;

        const car = await createCar(userId, req.body);

        res.json({ car });
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const { userId } = req.query;

        const car = await updateCar(userId, req.params.carId, req.body);
        res.json({
            message: 'Update car successfully',
            car,
        });
    } catch (e) {
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        const { userId } = req.query;

        await deleteCar(userId, req.params.carId);
        res.json({
            message: 'Delete successfully',
        });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getAll,
    getThis,
    add,
    update,
    remove,
};
