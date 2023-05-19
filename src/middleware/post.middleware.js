const postService = require('../service/post.service')
const {throwKoaException} = require('../exception/exception-kit')
const exceptionType = require('../exception/exception-type')

const validatePostListRequest = async (ctx, next) => {
    const {userUUID = ''} = ctx.query
    let where = {}

    if (userUUID.trim()) {
        where.uuid = userUUID
    }

    ctx.where = where

    await next()
}

const validatePostCreateRequest = async (ctx, next) => {
    const USER_TOKEN = ctx['USER_TOKEN']
    if (USER_TOKEN === null) {
        return throwKoaException(exceptionType.TOKEN_INVALID, ctx)
    }

    const {title = '', body = ''} = ctx.request.body

    if (!title.trim()) {
        return throwKoaException(exceptionType.FORM_EMPTY, ctx)
    }

    ctx.postCreateRequest = {
        UserId: USER_TOKEN['id'],
        title,
        body
    }

    await next()
}

const validatePostUpdateRequest = async (ctx, next) => {
    const USER_TOKEN = ctx['USER_TOKEN']
    if (USER_TOKEN === null) {
        return throwKoaException(exceptionType.TOKEN_INVALID, ctx)
    }

    const {uuid} = ctx.params
    const result = await postService.findOneByUUID(uuid)

    if (result === null) {
        return throwKoaException(exceptionType.POST_NOT_FOUND, ctx)
    }

    if (result['dataValues']['UserId'] !== USER_TOKEN['id']) {
        return throwKoaException(exceptionType.PERMISSION_DENIED, ctx)
    }

    const {title, body} = ctx.request.body
    const postUpdateRequest = {}

    if (typeof (title) !== 'undefined') {
        if (!title.trim()) {
            return throwKoaException(exceptionType.FORM_EMPTY, ctx)
        }
        if (title.length > 255) {
            return throwKoaException(exceptionType.TEXT_TO_LONG, ctx)
        }

        postUpdateRequest.title = title
    }

    if (typeof (body) !== 'undefined') {
        postUpdateRequest.body = body
    }

    ctx.postUpdateRequest = postUpdateRequest

    await next()
}

const validatePostRemoveRequest = async (ctx, next) => {
    const USER_TOKEN = ctx['USER_TOKEN']
    if (USER_TOKEN === null) {
        return throwKoaException(exceptionType.TOKEN_INVALID, ctx)
    }

    const {uuid} = ctx.params
    const result = await postService.findOneByUUID(uuid)

    if (result === null) {
        return throwKoaException(exceptionType.POST_NOT_FOUND, ctx)
    }

    if (!USER_TOKEN['role'] && result['dataValues']['UserId'] !== USER_TOKEN['id']) {
        return throwKoaException(exceptionType.PERMISSION_DENIED, ctx)
    }

    await next()
}

module.exports = {
    validatePostListRequest,
    validatePostCreateRequest,
    validatePostUpdateRequest,
    validatePostRemoveRequest
}