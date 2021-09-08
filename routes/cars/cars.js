const express = require('express');

const router = express.Router();

const { cars } = require('../../controllers');
const carsValidator = require('./validation');
const { authMiddleware, carMiddleware } = require('../../middleware');
const { tokenTypes } = require('../../config');

router.use('/', authMiddleware.checkAccessToken(tokenTypes.ACCESS_TYPE));
router
    .get('/', cars.getAll)
    .post('/', carsValidator.validateCreateCar, cars.add);

router.use(
    '/:cardId',
    carsValidator.validateMongoId,
    carMiddleware.isCarIdValid,
    authMiddleware.checkAccessToken(tokenTypes.ACCESS_TYPE),
);
router
    .get('/:carId', cars.getThis)
    .delete('/:carId', cars.remove)
    .put('/:carId', carsValidator.validateUpdateCar, cars.update);

module.exports = router;
