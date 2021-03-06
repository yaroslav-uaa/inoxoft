const router = require('express').Router();

const { cars } = require('../../controllers');
const carsValidator = require('./validation');
const {
    authMiddleware,
    carMiddleware,
    userMiddleware,
} = require('../../middleware');
const { actionTypes, tokenTypes, userRolesEnum } = require('../../config');
const upload = require('../../helpers/upload');

router
    .get('/', cars.getAll)
    .post(
        '/',
        authMiddleware.checkUserToken(
            actionTypes.ACCESS_TYPE,
            tokenTypes.ACCESS,
        ),
        carsValidator.validateCreateCar,
        cars.add,
    );
router.get('/:carId', cars.getThis);

//Admin route
router.delete(
    '/:carId',
    authMiddleware.checkUserToken(actionTypes.ACCESS_TYPE, tokenTypes.ACCESS),
    userMiddleware.getUserByDynamicParam('token', 'body', 'owner'),
    userMiddleware.checkUserRole([
        userRolesEnum.SUPER_ADMIN,
        userRolesEnum.ADMIN,
    ]),
    cars.removeByAdmin,
);

router.use(
    '/:carId',
    carsValidator.validateMongoId,
    carMiddleware.isCarIdValid,
    authMiddleware.checkUserToken(actionTypes.ACCESS_TYPE, tokenTypes.ACCESS),
);
router
    .delete('/:carId', cars.remove)
    .put('/:carId', carsValidator.validateUpdateCar, cars.update)
    .patch('/:carId/avatars', upload.single('avatar'), cars.uploadImg);

module.exports = router;
