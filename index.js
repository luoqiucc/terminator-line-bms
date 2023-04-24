const server = require('./src/app/server')
const {APP_PORT} = require('./src/app/config')
const {consoleLog} = require('./src/util/log')
const string = require('./src/value/string')

server.listen(
    APP_PORT,
    () => {
        consoleLog(string.STARTED_APPLICATION)
    }
)