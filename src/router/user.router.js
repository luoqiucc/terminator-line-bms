const Router = require('@koa/router')
const {
    list,
    detail,
    create,
    update,
    remove
} = require('../controller/user.controller')
const {
    validateUserCreateRequest,
    validateUserUpdateRequest,
    validateUserRemoveRequest
} = require('../middleware/user.middleware')

const userRouter = new Router()

userRouter
    .get('/users', list)
    .get('/user/:uuid', detail)
    .post('/user', validateUserCreateRequest, create)
    .put('/user', validateUserUpdateRequest, update)
    .del('/user/:uuid', validateUserRemoveRequest, remove)

module.exports = userRouter