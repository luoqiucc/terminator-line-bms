const userService = require('../service/user.service')
const {throwKoaException} = require('../exception/exception-kit')
const exceptionType = require('../exception/exception-type')

class UserController {
    async list(ctx) {
        const {page = '1', size = '10'} = ctx.query

        const result = await userService.list(Number(page), Number(size))

        const userList = []

        result['users'].forEach(
            (data) => {
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

    async detail(ctx) {
        const {uuid} = ctx.params
        const user = await userService.findOneByUUID(uuid)

        if (user === null) {
            return throwKoaException(exceptionType.USER_NOT_FOUND, ctx)
        }

        delete user['dataValues']['password']

        ctx.body = user['dataValues']
    }

    async create(ctx) {
        const userCreateRequest = ctx['userCreateRequest']
        await userService.create(userCreateRequest)
        delete userCreateRequest['password']

        ctx.body = userCreateRequest
    }

    async update(ctx) {
        const uuid = ctx['USER_TOKEN']['uuid']
        const userUpdateRequest = ctx['userUpdateRequest']
        await userService.updateByUUID(uuid, userUpdateRequest)

        ctx.body = userUpdateRequest
    }

    async remove(ctx) {
        const {uuid} = ctx.params
        await userService.removeByUUID(uuid)

        ctx.body = ''
    }
}

module.exports = new UserController()
