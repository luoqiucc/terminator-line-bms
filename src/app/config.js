const path = require('path')
const dotenv = require('dotenv')
const FS = require('fs')
const Path = require('path')
const {consoleError, consoleLog} = require('../util/log')
const string = require('../value/string')

dotenv.config({
    path: path.join(__dirname, '..', '..', '.env')
})

let PRIVATE_KEY
let PUBLIC_KEY
let SSL_CSR
let SSL_KEY

// JWT
try {
    PRIVATE_KEY = FS.readFileSync(Path.join(__dirname, 'key', 'private.key'), 'utf-8')
    PUBLIC_KEY = FS.readFileSync(Path.join(__dirname, 'key', 'public.key'), 'utf-8')
} catch (e) {
    consoleError(string.NOT_FOUND_SECRET_KEY, e)
}

// SSL
try {
    SSL_CSR = FS.readFileSync(Path.join(__dirname, 'ssl', 'server.cert'), 'utf-8')
    SSL_KEY = FS.readFileSync(Path.join(__dirname, 'ssl', 'server.key'), 'utf-8')
} catch (e) {
    consoleLog(string.HTTPS_CLOSE)
}

// HTTP HEADER
const TOKEN_PREFIX = 'Bearer '
const TOKEN_HEADER_STRING = 'authorization'

const {
    APP_PORT,
    APP_PORT_HTTPS,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
} = process.env

module.exports = {
    APP_PORT,
    APP_PORT_HTTPS,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    PRIVATE_KEY,
    PUBLIC_KEY,
    SSL_KEY,
    SSL_CSR,
    TOKEN_PREFIX,
    TOKEN_HEADER_STRING
}