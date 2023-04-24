const Router = require('@koa/router')
const {
    search,
    create,
    update,
    remove
} = require('../controller/user.controller')

const userRouter = new Router()

userRouter
    .get('/users', search)
    .post('/user', create)
    .put('/user', update)
    .del('/user', remove)

module.exports = userRouter