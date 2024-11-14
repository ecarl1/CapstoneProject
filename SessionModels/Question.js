const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL') // storing the database on the computers memory
const SessionAnswer = require('./Session')

const Question = sequelize.define('Question', {
    questionText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // questionID: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: SessionAnswer,
    //         key: 'questionID'
    //     }
    // }
   
});

module.exports = Question;