const path = require('path')
const dotenv = require('dotenv')
const FS = require('fs')
const Path = require('path')

dotenv.config({
    path: path.join(__dirname, '..', '..', '.env.development')
})

const PRIVATE_KEY = FS.readFileSync(Path.join(__dirname, 'key', 'private.key'), 'utf-8')
const PUBLIC_KEY = FS.readFileSync(Path.join(__dirname, 'key', 'public.key'), 'utf-8')

const TOKEN_PREFIX = 'Bearer '
const TOKEN_HEADER_STRING = 'authorization'

const {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
} = process.env

module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    PRIVATE_KEY,
    PUBLIC_KEY,
    TOKEN_PREFIX,
    TOKEN_HEADER_STRING
}