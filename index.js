const server = require('./src/app/server')
const init = require('./src/app/init')
const {APP_PORT} = require('./src/app/config')
const {consoleLog, consoleError} = require('./src/util/log')
const string = require('./src/value/string')

init.syncTable().then(
    () => {
        consoleLog(string.CREATED_TABLES)
    },
    (error) => {
        consoleError(string.NOT_READY_DATABASE, error)
    }
)

server.listen(
    APP_PORT,
    () => {
        consoleLog(string.STARTED_APPLICATION)
    }
)