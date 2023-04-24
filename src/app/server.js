const Koa = require('koa')
const {exceptionHandler} = require('../exception/exception-kit')
const tlRouter = require('../router/tl.router')
const userRouter = require('../router/user.router')

const server = new Koa()

server
    .use(tlRouter.routes())
    .use(tlRouter.allowedMethods())
    .use(userRouter.routes())
    .use(userRouter.allowedMethods())

server.on('exception', exceptionHandler)

module.exports = server