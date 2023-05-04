const userService = require('../service/user.service')

class UserController {
    async list(ctx) {
        const {page = '1', size = '10'} = ctx.query

        const result = await userService.list(Number(page), Number(size))

        const userList = []

        result['users'].forEach(
            (data) => {
                delete data['dataValues']['password']
                userList.push(data['dataValues'])
            }
        )

        ctx.body = {
            pagination: {
                currentPage: page,
                pageSize: size,
                recordCount: result['count']
            },
            users: userList,
        }
    }

    async create(ctx) {
        const userCreateRequest = ctx['userCreateRequest']
        await userService.create(userCreateRequest)
        delete userCreateRequest['password']
        ctx.body = userCreateRequest
    }

    async update(ctx) {
        const uuid = ctx['USER_TOKEN']['uuid']
        const updateUserRequest = ctx['updateUserRequest']
        await userService.updateByUUID(uuid, updateUserRequest)
        ctx.body = updateUserRequest
    }

    async remove(ctx) {
        const {uuid} = ctx.params
        await userService.removeByUUID(uuid)
        ctx.body = ''
    }
}

module.exports = new UserController()
