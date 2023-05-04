const {TOKEN_HEADER_STRING} = require('../app/config')
const {verifyToken} = require('../util/auth')

const loginCheck = async (ctx, next) => {
    let USER_TOKEN
    const token = ctx.headers[TOKEN_HEADER_STRING]
    if (token) {
        USER_TOKEN = verifyToken(token)
    } else {
        USER_TOKEN = null
    }

    ctx.USER_TOKEN = USER_TOKEN

    await next()
}

module.exports = {
    loginCheck
}