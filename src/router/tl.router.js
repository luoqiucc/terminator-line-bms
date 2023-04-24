const Router = require('@koa/router')

const tlRouter = new Router()

tlRouter.all('/tl', (ctx) => {
    ctx.body = 'Terminator Line >_<'
})

module.exports = tlRouter