const userModel = require('../model/user.model')

class UserService {
    async create(userCreateRequest) {
        return await userModel.create(userCreateRequest)
    }
}

module.exports = new UserService()