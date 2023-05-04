const Router = require('@koa/router')
const {
    list,
    create,
    update,
    remove
} = require('../controller/user.controller')
const {
    validateCreateUserRequest
} = require('../middleware/user.middleware')

const userRouter = new Router()

userRouter
    .get('/users', list)
    .post('/user', validateCreateUserRequest, create)
    .put('/user', update)
    .del('/user', remove)

module.exports = userRouter