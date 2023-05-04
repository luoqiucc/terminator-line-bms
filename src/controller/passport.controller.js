const {TOKEN_HEADER_STRING, TOKEN_PREFIX} = require('../app/config')
const {signToken} = require('../util/auth')

class PassportController {
    async login(ctx) {
        ctx.set('Access-Control-Expose-Headers', TOKEN_HEADER_STRING)
        ctx.set(
            TOKEN_HEADER_STRING,
            TOKEN_PREFIX + signToken(ctx['user'])
        )
        ctx.body = ''
    }
}

module.exports = new PassportController()