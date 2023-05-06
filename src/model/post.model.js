const post = (sequelize, DataTypes) => {
    return sequelize.define('Post', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT
        }
    })
}

module.exports = post