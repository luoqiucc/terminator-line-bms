const md5 = require('md5')
const jwt = require('jsonwebtoken')
const {PRIVATE_KEY, PUBLIC_KEY} = require('../app/config')

const SALT = 'komekko'
const passwordEncoding = (password) => {
    return md5(password + SALT)
}

const signToken = (payload) => {
    return jwt.sign(
        payload,
        PRIVATE_KEY,
        {
            expiresIn: '5d',
            algorithm: 'RS256'
        }
    )
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, PUBLIC_KEY, {
            algorithm: ['RS256']
        })
    } catch (e) {
        return null
    }
}

module.exports = {
    passwordEncoding,
    signToken,
    verifyToken
}