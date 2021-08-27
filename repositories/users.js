const fs = require('fs/promises');
const path = require('path');

const { v4: uuid } = require('uuid');

const usersPath = path.join(__dirname, '../model', 'users.json');

const readData = async () => {
    const data = await fs.readFile(usersPath, 'utf-8');
    return JSON.parse(data);
};

const getUserByEmail = async (email) => {
    const users = await readData();
    const [result] = users.filter((el) => el.email === email);
    return result;
};

const getUserInfo = async (userId) => {
    const users = await readData();
    const [result] = users.filter((el) => el.id === userId);
    return result;
};

const addUser = async (body) => {
    const id = uuid();
    const user = {
        id,
        ...body,
    };
    const users = await readData();

    const newUser = [...users, user];
    await fs.writeFile(usersPath, JSON.stringify(newUser));
    return user;
};

module.exports = {
    readData,
    addUser,
    getUserInfo,
    getUserByEmail,
};
