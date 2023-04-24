const getTime = () => {
    const date = new Date()

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    return `[${year}/${month}/${day} ${hours}:${minutes}:${seconds}]`
}

const consoleLog = (message) => {
    console.log(getTime() + message)
}

const consoleWarring = () => {

}

const consoleError = () => {

}

module.exports = {
    consoleLog,
    consoleError,
    consoleWarring
}
