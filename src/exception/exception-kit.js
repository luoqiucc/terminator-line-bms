const throwKoaException = (exceptionType, ctx) => {
    ctx.app.emit('exception', exceptionType, ctx)
}

const exceptionHandler = (exceptionType, ctx) => {
    ctx.status = exceptionType.status
    ctx.body = {
        err_msg: exceptionType.err_msg
    }
}

module.exports = {
    throwKoaException,
    exceptionHandler
}