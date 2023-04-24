const {Sequelize} = require('sequelize')
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
} = require('./config')

const sequelize = new Sequelize(
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    {
        dialect: 'mysql',
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        ssl: true,
        logging: false
    }
)

module.exports = sequelize