const Car = require('../model/Cars');
const { carService, UploadService } = require('../services');

const { statusCodesEnum, STATUS_CODES, ERRORS_TEMPLATE } = require('../config');
const fs = require('fs/promises');
const ErrorHandler = require('../errors/errorHandler');

const getAll = async (req, res, next) => {
    try {
        const { query } = req;

        const cars = await carService.findAll(query);

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
        const { carId } = req.params;

        const carById = await Car.findOne({
            _id: carId,
        });

        if (!carById) {
            throw new ErrorHandler(
                STATUS_CODES.BAD_REQUEST,
                ERRORS_TEMPLATE.CAR_ID_CONFLICT,
            );
        }
        res.json({ carById });
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

const uploadImg = async (req, res, next) => {
    try {
        const { path } = req.file;
        const { carId } = req.params;

        const uploads = new UploadService();
        const { idCloudAvatar, avatarURL } = await uploads.saveAvatar(
            path,
            req.car.idCloudAvatar,
        );

        await fs.unlink(path);

        const car = await Car.updateOne(
            { _id: carId },
            { avatar: avatarURL, idCloudAvatar },
            { new: true },
        );
        res.json({ car });
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
    uploadImg,
};
