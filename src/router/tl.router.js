const Router = require('@koa/router')

const tlRouter = new Router()

tlRouter.all('/tl', (ctx) => {
    ctx.body = {
        text: 'Terminator Line >_<',
        from: '@shadowsong'
    }
})

module.exports = tlRouter