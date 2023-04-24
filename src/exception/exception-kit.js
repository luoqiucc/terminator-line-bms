const throwKoaException = (exceptionType, ctx) => {
    ctx.app.emit('exception', exceptionType, ctx)
}

const exceptionKit = (exceptionType, ctx) => {
    ctx.status = exceptionType.status
    ctx.body = {
        err_msg: exceptionType.err_msg
    }
}

module.exports = {
    throwKoaException,
    exceptionHandler: exceptionKit
}