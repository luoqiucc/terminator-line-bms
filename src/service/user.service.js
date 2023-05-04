const userModel = require('../model/user.model')

class UserService {
    async count() {
        return await userModel.count()
    }

    async search() {

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
}

module.exports = new UserService()
