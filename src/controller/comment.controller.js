const commentService = require('../service/comment.service')
const {throwKoaException} = require('../exception/exception-kit')
const exceptionType = require('../exception/exception-type')

class CommentController {

    /*
     * 这个方法获取对应文章的所有评论
     */
    async list(ctx) {
        const {page = '1', size = '20'} = ctx.query
        const {postId} = ctx.commentListRequest

        let result

        // TODO: 临时修复，总感觉不够优雅，后面优化
        try {
            result = await commentService.listByPostId(postId, Number(page), Number(size))
        } catch (e) {
            return throwKoaException(exceptionType.PARAMETER_ERROR, ctx)
        }

        const commentList = []

        result['comments'].forEach(
            (data) => {
                commentList.push(data['dataValues'])
            }
        )

        ctx.body = {
            pagination: {
                currentPage: page,
                pageSize: size,
                recordCount: result['count']
            },
            comments: commentList
        }
    }

    async detail(ctx) {
        const {uuid} = ctx.params
        const comment = await commentService.findOneByUUID(uuid)
        if (comment === null) {
            return throwKoaException(exceptionType.COMMENT_NOT_FOUND, ctx)
        }

        ctx.body = comment['dataValues']
    }

    async create(ctx) {
        const commentCreateRequest = ctx.commentCreateRequest
        await commentService.create(commentCreateRequest)

        delete commentCreateRequest['UserId']
        delete commentCreateRequest['PostId']

        ctx.body = commentCreateRequest
    }

    async remove(ctx) {
        const {uuid} = ctx.params
        await commentService.removeByUUID(uuid)

        ctx.body = ''
    }
}

module.exports = new CommentController()