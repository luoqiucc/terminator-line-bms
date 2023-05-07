const sequelize = require('./database')
const {DataTypes} = require('sequelize')
const {consoleLog, consoleError} = require('../util/log')
const string = require('../value/string')

const user = require('./user.model')
const post = require('./post.model')
const comment = require('./comment.model')

const userModel = user(sequelize, DataTypes)
const postModel = post(sequelize, DataTypes)
const commentModel = comment(sequelize, DataTypes)

userModel.hasMany(postModel)
postModel.belongsTo(userModel)
postModel.hasMany(commentModel)
commentModel.belongsTo(postModel)

sequelize.sync().then(
    result => consoleLog(string.CREATED_TABLES),
    error => consoleError(string.NOT_READY_DATABASE, error)
)

module.exports = {
    userModel,
    postModel,
    commentModel
}