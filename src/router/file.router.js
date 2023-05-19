const Router = require('@koa/router')
const {
    upload,
    validateFileCreateRequest
} = require('../middleware/file.middleware')
const {
    create
} = require('../controller/file.controller')

const fileRouter = new Router()

fileRouter
    .post('/upload', validateFileCreateRequest, upload.single('file'), create)

module.exports = fileRouter