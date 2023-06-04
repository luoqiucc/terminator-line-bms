const http = require('http')
const https = require('https')
const {default: enforceHttps} = require('koa-sslify')
const server = require('./src/app/server')
const {
    APP_PORT,
    APP_PORT_HTTPS,
    SSL_CSR,
    SSL_KEY
} = require('./src/app/config')
const {consoleLog} = require('./src/util/log')
const string = require('./src/value/string')

if (SSL_CSR && SSL_KEY) {
    server.use(enforceHttps({
        port: APP_PORT_HTTPS
    }))

    const options = {
        key: SSL_KEY,
        cert: SSL_CSR
    }

    https.createServer(options, server.callback()).listen(APP_PORT_HTTPS, (error) => {
        if (!error) {
            consoleLog(string.STARTED_APPLICATION + '(HTTPS)')
        }
    })
}

http.createServer(server.callback()).listen(APP_PORT, (error) => {
    if (!error) {
        consoleLog(string.STARTED_APPLICATION + '(HTTP)')
    }
})