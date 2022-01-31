const sequelize = require('../sequelize')
const { DataTypes } = require('sequelize');

const Movie = sequelize.define('movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 200]
        }
    },
    category: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['romance', 'horror', 'action', 'drama'],
        defaultValue: 'romance'
    },
    publicationDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

module.exports = Movie;