const userService = require('../service/user.service')
const {passwordEncoding} = require('../util/auth')
const {throwKoaException} = require('../exception/exception-kit')
const exceptionType = require('../exception/exception-type')
const validateLoginRequest = async (ctx, next) => {
    const {email = '', password = ''} = ctx.request.body

    if (!email.trim() || !password.trim()) {
        return throwKoaException(exceptionType.FORM_EMPTY, ctx)
    }

    const regular = /^[a-z,A-Z,0-9]+@[a-z,A-Z]+.[a-z,A-Z]+$/
    if (!email.match(regular)) {
        return throwKoaException(exceptionType.EMAIL_FORMAT_ERROR, ctx)
    }

    const result = await userService.findOneByEmail(email)
    if (result === null) {
        return throwKoaException(exceptionType.USER_NOT_FOUND, ctx)
    }

    const user = result['dataValues']
    if (passwordEncoding(password) !== user['password']) {
        return throwKoaException(exceptionType.AUTHENTICATION_FAILED, ctx)
    }

    ctx.user = {
        id: user['id'],
        uuid: user['uuid'],
        role: user['role']
    }

    await next()
}

module.exports = {
    validateLoginRequest
}