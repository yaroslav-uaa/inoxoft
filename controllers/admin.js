const { Users, ActionTokens } = require('../model');

const { userRolesEnum } = require('../config');
const { jwtService, EmailService, CreateSender } = require('../services');

const createAdmin = async (req, res, next) => {
    try {
        const user = await new Users({ ...req.body });

        const userToken = jwtService.generateResetToken();

        await ActionTokens.create({ token: userToken, owner: user._id });

        user.role = userRolesEnum.ADMIN;
        user.verify = true;

        await user.save();

        try {
            const emailService = new EmailService(new CreateSender());

            await emailService.sendResetPasswordEmail(userToken, user.email);
        } catch (e) {
            next(e);
        }

        return res.json({
            user,
            message:
                "Create successful, admin user can check his email for reset password instructions'",
        });
    } catch (e) {
        next(e);
    }
};
module.exports = { createAdmin };
