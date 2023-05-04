const Router = require('@koa/router')
const {
    validateLoginRequest
} = require('../middleware/passport.middleware')
const {
    login
} = require('../controller/passport.controller')

const passportRouter = new Router()

passportRouter
    .post('/login', validateLoginRequest, login)

module.exports = passportRouter