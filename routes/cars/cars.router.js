const router = require('express').Router();

const { cars } = require('../../controllers');
const carsValidator = require('./validation');
const { authMiddleware, carMiddleware } = require('../../middleware');
const { actionTypes, tokenTypes } = require('../../config');
const upload = require('../../helpers/upload');

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
    .put('/:carId', carsValidator.validateUpdateCar, cars.update)
    .patch('/:carId/avatars', upload.single('avatar'), cars.uploadImg);

module.exports = router;
