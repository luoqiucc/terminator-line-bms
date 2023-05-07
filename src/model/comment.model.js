const comment = (sequelize, DataTypes) => {
    return sequelize.define('Comment', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            type: DataTypes.STRING
        },
        body: {
            type: DataTypes.STRING
        }
    })
}

module.exports = comment
