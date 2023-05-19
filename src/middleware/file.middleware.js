const multer = require('@koa/multer')
const {throwKoaException} = require('../exception/exception-kit')
const exceptionType = require('../exception/exception-type')

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

const validateFileCreateRequest = async (ctx, next) => {
    const USER_TOKEN = ctx['USER_TOKEN']
    if (USER_TOKEN === null) {
        return throwKoaException(exceptionType.TOKEN_INVALID, ctx)
    }

    ctx.fileCreateRequest = {
        UserId: USER_TOKEN['id'],
    }

    await next()
}

module.exports = {
    upload,
    validateFileCreateRequest,
}