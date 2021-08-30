const Car = require('../model/cars');

const findAllCars = (userId) => Car.find({ owner: userId });

const findCarById = (userId, carId) => Car.findOne({
    _id: carId,
    owner: userId,
});

const createCar = async (userId, body) => {
    const car = new Car({ owner: userId, ...body });
    // eslint-disable-next-line no-return-await
    return await car.save();
};

const updateCar = (userId, carId, body) => Car.findOneAndUpdate(
    {
        _id: carId,
        owner: userId,
    },
    { ...body },
    { new: true },
);

const deleteCar = (userId, carId) => Car.findOneAndDelete({
    _id: carId,
    owner: userId,
});

module.exports = {
    findAllCars,
    findCarById,
    createCar,
    updateCar,
    deleteCar,
};
