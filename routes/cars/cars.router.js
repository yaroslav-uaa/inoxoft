const router = require('express').Router();

const { cars } = require('../../controllers');
const carsValidator = require('./validation');
const { authMiddleware, carMiddleware } = require('../../middleware');
const { actionTypes, tokenTypes } = require('../../config');

router.use(
    '/',
    authMiddleware.checkUserToken(actionTypes.ACCESS_TYPE, tokenTypes.ACCESS),
);
router
    .get('/', cars.getAll)
    .post('/', carsValidator.validateCreateCar, cars.add);

router.use(
    '/:carId',
    carsValidator.validateMongoId,
    carMiddleware.isCarIdValid,
    authMiddleware.checkUserToken(actionTypes.ACCESS_TYPE, tokenTypes.ACCESS),
);
router
    .get('/:carId', cars.getThis)
    .delete('/:carId', cars.remove)
    .put('/:carId', carsValidator.validateUpdateCar, cars.update);

module.exports = router;
