const {postModel, userModel} = require('../model')

class PostService {
    async list(page, size) {
        const count = await postModel.count()

        const posts = await postModel.findAll({
            attributes: {
                exclude: ['body']
            },
            offset: (page - 1) * size,
            limit: size,
            include: {
                model: userModel,
                attributes: {
                    exclude: ['password']
                }
            }
        })

        return {
            count,
            posts
        }
    }

    async findOneByUUID(uuid) {
        return postModel.findOne({
            where: {
                uuid
            },
            include: {
                model: userModel,
                attributes: {
                    exclude: ['password']
                }
            }
        })
    }

    async create(postCreateRequest) {
        return postModel.create(postCreateRequest, {
            include: {
                model: userModel
            }
        })
    }

    async updateByUUID(uuid, postUpdateRequest) {
        return postModel.update(postUpdateRequest, {
            where: {
                uuid
            }
        })
    }

    async removeByUUID(uuid) {
        return postModel.destroy({
            where: {
                uuid
            }
        })
    }
}

module.exports = new PostService()