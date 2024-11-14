const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL') // storing the database on the computers memory
const SessionAnswer = require('./SessionAnswer')

const Answer = sequelize.define('Answer', {
    answerText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // answerID: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: SessionAnswer,
    //         key: 'answerID'
    //     }
    // },
    answerValue: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
   
});

module.exports = Answer;