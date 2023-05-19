const path = require('path')
const fs = require('fs')
const {uid} = require('uid')

// TODO: 数据类型转换
const toNumber = (string) => {
    return ''
}

const UID_LENGTH = 12
const getUID = () => {
    return uid(UID_LENGTH)
}

const writeFile = async (originalname, buffer) => {
    const filename = getUID() + '_' + originalname
    const filePath = path.join(__dirname, '..', '..', 'public', 'media', filename)
    fs.writeFileSync(filePath, buffer)
    return filename
}

module.exports = {
    toNumber,
    getUID,
    writeFile
}