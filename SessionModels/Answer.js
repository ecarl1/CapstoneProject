const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL') // storing the database on the computers memory
const Session_Answer = require('./Session_Answer')

const Answer = sequelize.define('Answer', {
    answer_text: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    answer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    answer_int: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
},{
    timestamps: false
}  
);

module.exports = Answer;