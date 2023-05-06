const {userModel} = require('../model')

class UserService {
    async count() {
        return userModel.count()
    }

    // TODO: 搜索
    async search() {

    }

    async list(page, size) {
        const count = await userModel.count()

        const users = await userModel.findAll({
            attributes: {
                exclude: ['password']
            },
            offset: (page - 1) * size,
            limit: size
        })

        return {
            count,
            users
        }
    }

    async create(userCreateRequest) {
        return userModel.create(userCreateRequest)
    }

    async findOneByEmail(email) {
        return userModel.findOne({
            where: {
                email
            }
        })
    }

    async findOneByUUID(uuid) {
        return userModel.findOne({
            where: {
                uuid
            }
        })
    }

    async updateByUUID(uuid, updateUserRequest) {
        return userModel.update(updateUserRequest, {
            where: {
                uuid
            }
        })
    }

    async removeByUUID(uuid) {
        return userModel.destroy({
            where: {
                uuid
            }
        })
    }
}

module.exports = new UserService()
