const {Model, DataTypes} = require('sequelize')
const sequelize = require('../app/database')
const {passwordEncoding} = require('../util/auth')

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
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue('password', passwordEncoding(value));
            }
        },
        bio: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize
    }
)

module.exports = User