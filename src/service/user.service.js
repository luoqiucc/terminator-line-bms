const userModel = require('../model/user.model')

class UserService {
    async count() {
        return await userModel.count()
    }

    // TODO: 搜索
    async search() {
    }

    async list(page, size) {
        const count = await userModel.count()

        const users = await userModel.findAll({
            offset: (page - 1) * size,
            limit: size
        })

        return {
            count,
            users
        }
    }

    async create(userCreateRequest) {
        return await userModel.create(userCreateRequest)
    }

    async findOneByEmail(email) {
        return await userModel.findOne({
            where: {
                email
            }
        })
    }

    async findOneByUUID(uuid) {
        return await userModel.findOne({
            where: {
                uuid
            }
        })
    }

    async updateByUUID(uuid, updateUserRequest) {
        return await userModel.update(updateUserRequest, {
            where: {
                uuid
            }
        })
    }

    async removeByUUID(uuid) {
        return await userModel.destroy({
            where: {
                uuid
            }
        })
    }
}

module.exports = new UserService()
