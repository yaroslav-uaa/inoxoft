const Car = require('../model/Cars');

const getAll = async (req, res, next) => {
    try {
        const { userId } = req.query;

        const cars = await Car.find({ owner: userId });
        res.json({
            cars,
        });
    } catch (e) {
        next(e);
    }
};

// eslint-disable-next-line require-await
const getThis = (req, res, next) => {
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

        const car = await Car.create({ owner: userId, ...req.body });

        res.json({ car });
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const { carId } = req.params;

        const car = await Car.findOneAndUpdate(
            {
                _id: carId,
                owner: userId,
            },
            { ...req.body },
            { new: true },
        );

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
        const { carId } = req.params;

        await Car.findOneAndDelete({
            _id: carId,
            owner: userId,
        });

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
