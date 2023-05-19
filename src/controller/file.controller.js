const fileService = require('../service/file.service')
const {
    writeFile
} = require('../util/common')

class FileController {
    async create(ctx) {
        const {
            originalname,
            mimetype,
            size,
            buffer
        } = ctx.file
        const filename = await writeFile(originalname, buffer)

        let fileCreateRequest = {
            UserId: ctx['fileCreateRequest']['UserId'],
            filename,
            originalname,
            mimetype,
            size,
            buffer
        }
        const result = await fileService.create(fileCreateRequest)

        ctx.body = {
            originalname,
            filename,
            mimetype,
            size: size + ' KB'
        }
    }
}

module.exports = new FileController()