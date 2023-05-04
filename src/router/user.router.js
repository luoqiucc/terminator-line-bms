const Router = require('@koa/router')
const {
    list,
    create,
    update,
    remove
} = require('../controller/user.controller')
const {
    validateCreateUserRequest,
    validateUpdateUserRequest,
    validateRemoveUserRequest
} = require('../middleware/user.middleware')

const userRouter = new Router()

userRouter
    .get('/users', list)
    .post('/user', validateCreateUserRequest, create)
    .put('/user', validateUpdateUserRequest, update)
    .del('/user/:uuid', validateRemoveUserRequest, remove)

module.exports = userRouter