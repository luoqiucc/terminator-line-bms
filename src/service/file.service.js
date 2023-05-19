const {fileModel} = require('../model')

class FileService {
    async create(fileCreateRequest) {
        return fileModel.create(fileCreateRequest)
    }
}

module.exports = new FileService()