const path = require('path')
const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const {loginCheck} = require('../middleware/auth.middleware')
const {exceptionHandler} = require('../exception/exception-kit')
const tlRouter = require('../router/tl.router')
const userRouter = require('../router/user.router')

const server = new Koa()

server
    .use(cors())
    .use(bodyParser())
    .use(koaStatic(
        path.join(__dirname, '..', '..', 'public', 'media'),
        {}
    ))
    .use(loginCheck)

server
    .use(tlRouter.routes())
    .use(tlRouter.allowedMethods())
    .use(userRouter.routes())
    .use(userRouter.allowedMethods())

server.on('exception', exceptionHandler)

module.exports = server
