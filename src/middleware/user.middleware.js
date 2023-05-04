const userService = require('../service/user.service')
const {throwKoaException} = require('../exception/exception-kit')
const exceptionType = require('../exception/exception-type')

const validateCreateUserRequest = async (ctx, next) => {

    let role = false

    const userCount = await userService.count()

    const USER_TOKEN = ctx['USER_TOKEN']

    if (userCount === 0) {
        role = true
    } else {
        if (!USER_TOKEN || !USER_TOKEN['role']) {
            return throwKoaException(exceptionType.PERMISSION_DENIED, ctx)
        }
    }

    const {username = '', email = '', password = ''} = ctx.request.body

    if (!email.trim() || !password.trim()) {
        return throwKoaException(exceptionType.FORM_EMPTY, ctx)
    }

    if (username.length > 255 || password.length > 255 || email.length > 255) {
        return throwKoaException(exceptionType.TEXT_TO_LONG, ctx)
    }

    const regular = /^[a-z,A-Z,0-9]+@[a-z,A-Z]+.[a-z,A-Z]+$/
    if (!email.match(regular)) {
        return throwKoaException(exceptionType.EMAIL_FORMAT_ERROR, ctx)
    }

    const result = await userService.findOneByEmail(email)
    if (result !== null) {
        return throwKoaException(exceptionType.EMAIL_EXIST, ctx)
    }

    ctx.userCreateRequest = {
        username,
        email,
        password,
        role
    }

    await next()
}

// TODO: 等待重构
const validateUpdateUserRequest = async (ctx, next) => {
    const uid = ctx.USER_TOKEN['uid']
    const {username, bio} = ctx.request.body

    if (typeof (username) === 'undefined' || typeof (bio) === 'undefined') {
        return throwKoaException(exceptionType.PARAMETER_ERROR, ctx)
    }

    if (username.length > 30 || bio.length > 200) {
        return throwKoaException(exceptionType.TEXT_TO_LONG, ctx)
    }

    ctx.updateUserRequest = {
        uid,
        username,
        bio
    }

    await next()
}

module.exports = {
    validateCreateUserRequest,
    validateUpdateUserRequest
}