const postService = require('../service/post.service')
const commentService = require('../service/comment.service')
const {throwKoaException} = require('../exception/exception-kit')
const exceptionType = require('../exception/exception-type')

const validateCommentListRequest = async (ctx, next) => {
    const {postUUID = ''} = ctx.query

    const result = await postService.findOneByUUID(postUUID)
    if (result === null) {
        return throwKoaException(exceptionType.POST_NOT_FOUND, ctx)
    }

    const post = result['dataValues']

    ctx.commentListRequest = {
        postId: post['id']
    }

    await next()
}

const validateCommentCreateRequest = async (ctx, next) => {
    const {postUUID = '', email = '', body = ''} = ctx.request.body

    if (!email.trim() || !body.trim() || !postUUID.trim()) {
        return throwKoaException(exceptionType.FORM_EMPTY, ctx)
    }

    const regular = /^[a-z,A-Z,0-9]+@[a-z,A-Z]+.[a-z,A-Z]+$/
    if (!email.match(regular)) {
        return throwKoaException(exceptionType.EMAIL_FORMAT_ERROR, ctx)
    }

    const result = await postService.findOneByUUID(postUUID)
    if (result === null) {
        return throwKoaException(exceptionType.POST_NOT_FOUND, ctx)
    }

    const post = result['dataValues']

    ctx.commentCreateRequest = {
        PostId: post['id'],
        email,
        body
    }

    await next()
}

const validateCommentRemoveRequest = async (ctx, next) => {
    const USER_TOKEN = ctx['USER_TOKEN']
    if (USER_TOKEN === null) {
        return throwKoaException(exceptionType.TOKEN_INVALID, ctx)
    }

    const {uuid} = ctx.params
    const result = await commentService.findOneByUUID(uuid)

    if (result === null) {
        return throwKoaException(exceptionType.COMMENT_NOT_FOUND, ctx)
    }

    if (!USER_TOKEN['role'] &&
        result['dataValues']['Post']['dataValues']['UserId'] !== USER_TOKEN['id']) {
        return throwKoaException(exceptionType.PERMISSION_DENIED, ctx)
    }

    await next()
}

module.exports = {
    validateCommentCreateRequest,
    validateCommentListRequest,
    validateCommentRemoveRequest
}