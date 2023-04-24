const {Model, DataTypes} = require('sequelize')
const sequelize = require('../app/database')

class User extends Model {
    // user
}

User.init(
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        bio: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        sequelize
    }
)

module.exports = User