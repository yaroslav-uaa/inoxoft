const User = require('../model/users');

const findAllUsers = () => User.find()
    .select('-password');

const findUserById = (id) => User.findById({ _id: id });

const findUserByEmail = (email) => User.findOne({ email });

const createUser = async (body) => {
    const user = new User(body);
    // eslint-disable-next-line no-return-await
    return await user.save();
};

const updateUser = (id, body) => User.findOneAndUpdate({ _id: id }, { ...body }, { new: true });

const deleteUser = (id) => User.findOneAndDelete({ _id: id });

module.exports = {
    findAllUsers,
    findUserById,
    findUserByEmail,
    createUser,
    updateUser,
    deleteUser,
};
