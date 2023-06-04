const {commentModel, postModel} = require('../model')

class CommentService {
    async listByPostId(postId, page, size) {
        const count = await commentModel.count({
            where: {
                PostId: postId
            }
        })

        const comments = await commentModel.findAll({
            where: {
                PostId: postId
            },
            order: [
                ['createdAt', 'DESC'],
            ],
            offset: (page - 1) * size,
            limit: size,
        })

        return {
            count,
            comments
        }
    }

    async listByUserId(userId, page, size) {
        const count = await commentModel.count({
            include: {
                model: postModel,
                where: {
                    UserId: userId
                }
            }
        })

        const comments = await commentModel.findAll({
            offset: (page - 1) * size,
            limit: size,
            include: {
                model: postModel,
                where: {
                    UserId: userId
                }
            }
        })

        return {
            count,
            comments
        }
    }

    async findOneByUUID(uuid) {
        return commentModel.findOne({
            where: {
                uuid
            },
            include: {
                model: postModel,
                attributes: {
                    exclude: ['body']
                }
            }
        })
    }

    async create(commentCreateRequest) {
        return commentModel.create(commentCreateRequest)
    }

    async removeByUUID(uuid) {
        return commentModel.destroy({
            where: {
                uuid
            }
        })
    }
}

module.exports = new CommentService()