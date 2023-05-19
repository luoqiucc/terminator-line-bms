const file = (sequelize, DataTypes) => {
    return sequelize.define('File', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        originalname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mimetype: {
            type: DataTypes.STRING,
            allowNull: false
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

module.exports = file