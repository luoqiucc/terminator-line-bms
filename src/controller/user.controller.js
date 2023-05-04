const userService = require('../service/user.service')

class UserController {
    async list(ctx) {

    }

    async create(ctx) {
        const userCreateRequest = ctx['userCreateRequest']
        await userService.create(userCreateRequest)
        delete userCreateRequest['password']
        ctx.body = userCreateRequest
    }

    async update(ctx) {

    }

    async remove(ctx) {

    }
}

module.exports = new UserController()
