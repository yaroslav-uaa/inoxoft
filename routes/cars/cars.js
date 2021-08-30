const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/cars');
const {
    validateUpdateCar,
    validateCreateCar,
    validateMongoId,
} = require('./validation');
const { isCarIdValid } = require('../../middleware/car.middlerware');

router.get('/', ctrl.getAll)
    .post('/', validateCreateCar, ctrl.add);

router
    .get('/:carId', validateMongoId, isCarIdValid, ctrl.getThis)
    .delete('/:carId', validateMongoId, isCarIdValid, ctrl.remove)
    .put(
        '/:carId',
        validateMongoId,
        validateUpdateCar,
        isCarIdValid,
        ctrl.update,
    );

module.exports = router;
