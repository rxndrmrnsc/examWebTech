const sequelize = require('../sequelize')
const { DataTypes, STRING } = require('sequelize');


const CrewMember = sequelize.define('crewmember', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            len: [5, 200]
        }
    },
    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['director', 'writer', 'actor']
    }
});

module.exports = CrewMember;