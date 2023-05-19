const Router = require('@koa/router')
const {
    list,
    detail,
    create,
    update,
    remove
} = require('../controller/post.controller')
const {
    validatePostListRequest,
    validatePostCreateRequest,
    validatePostUpdateRequest,
    validatePostRemoveRequest
} = require('../middleware/post.middleware')

const postRouter = new Router()

postRouter
    .get('/posts', validatePostListRequest, list)
    .get('/post/:uuid', detail)
    .post('/post', validatePostCreateRequest, create)
    .put('/post/:uuid', validatePostUpdateRequest, update)
    .del('/post/:uuid', validatePostRemoveRequest, remove)

module.exports = postRouter