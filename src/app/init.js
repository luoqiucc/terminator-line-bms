const userModel = require('../model/user.model')

class Init {
    async syncTable() {
        await userModel.sync()
    }
}

module.exports = new Init()