const Router = require('@koa/router')
const {
    list,
    detail,
    create,
    remove
} = require('../controller/comment.controller')
const {
    validateCommentListRequest,
    validateCommentCreateRequest,
    validateCommentRemoveRequest
} = require('../middleware/comment.middleware')

const commentRouter = new Router()

commentRouter
    .get('/comments', validateCommentListRequest, list)
    .get('/comment/:uuid', detail)
    .post('/comment', validateCommentCreateRequest, create)
    .del('/comment/:uuid', validateCommentRemoveRequest, remove)

module.exports = commentRouter