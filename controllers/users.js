const fs = require('fs/promises')
const path = require('path')

const {HttpCode} = require('../config/config')
const {v4: uuid} = require('uuid')

const usersPath = path.join(__dirname, '../model','users.json')

const readData = async () => {
    const data = await fs.readFile(usersPath, 'utf-8')
    return JSON.parse(data)
}

const getUserByEmail = async (email) => {
    const users = await readData()
    const [result] = users.filter((el) => el.email === email)
    return result
}

const getUserInfo = async (id) => {
    const users = await readData()
    const [result] = users.filter((el) => el.id === id)
    return result
}

const addUser = async (body) => {
    const id = uuid()
    const user = {
        id,
        ...body
    }
    const users = await readData()

    const newUser = [...users, user]
    await fs.writeFile(usersPath, JSON.stringify(newUser))
    return user
}

const register = async (req, res, next) => {
    try {
        const user = await getUserByEmail(req.body.email)
        if (user) {
            return res.status(HttpCode.CONFLICT).json({
                status: 'error',
                code: HttpCode.CONFLICT,
                message: "Email is already used"
            })
        }

        const {id, email, password} = await addUser(req.body)

        return res.redirect('/login').status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            message: "You registered successfully",
            user: {id, email, password}
        })
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await getUserByEmail(req.body.email)
        const isValidPassword = user?.password === req.body.password

        if (!user || !isValidPassword) {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: "unauthorized",
                code: HttpCode.UNAUTHORIZED,
                message: "invalid login or password"
            })
        }
        return res.render('main',{message:`You ${user.email} success logged in`})
    } catch (e) {
        next(e)
    }
}

const usersList = async (req,res,next) =>{
        try {
            const users = await readData()

            res.render('userlist', {users})
        } catch (e){
            next(e)
        }
}

module.exports = {
    addUser,
    register,
    login,
    usersList,
    getUserInfo,
}