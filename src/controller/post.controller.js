const postService = require('../service/post.service')
const {throwKoaException} = require('../exception/exception-kit')
const exceptionType = require('../exception/exception-type')

class PostController {
    async list(ctx) {
        const {page = '1', size = '10'} = ctx.query
        let where = ctx['where']
        let result

        // TODO: 临时修复，总感觉不够优雅，后面优化
        try {
            result = await postService.list(where, Number(page), Number(size))
        } catch (e) {
            return throwKoaException(exceptionType.PARAMETER_ERROR, ctx)
        }

        const postList = []

        result['posts'].forEach(
            (data) => {
                postList.push(data['dataValues'])
            }
        )

        ctx.body = {
            pagination: {
                currentPage: page,
                pageSize: size,
                recordCount: result['count']
            },
            posts: postList,
        }
    }

    async detail(ctx) {
        const {uuid} = ctx.params
        const post = await postService.findOneByUUID(uuid)
        if (post === null) {
            return throwKoaException(exceptionType.POST_NOT_FOUND, ctx)
        }

        ctx.body = post['dataValues']
    }

    async create(ctx) {
        const postCreateRequest = ctx['postCreateRequest']
        const result = await postService.create(postCreateRequest)

        ctx.body = {
            uuid: result['dataValues']['uuid'],
            ...postCreateRequest
        }
    }

    async update(ctx) {
        const {uuid} = ctx.params
        const postUpdateRequest = ctx['postUpdateRequest']
        await postService.updateByUUID(uuid, postUpdateRequest)

        ctx.body = postUpdateRequest
    }

    async remove(ctx) {
        const {uuid} = ctx.params
        await postService.removeByUUID(uuid)

        ctx.body = ''
    }
}

module.exports = new PostController()