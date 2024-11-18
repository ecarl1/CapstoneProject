const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL') // storing the database on the computers memory
const SessionAnswer = require('./Session')

const Question = sequelize.define('Question', {
    question_text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SessionAnswer,
            key: 'question_id'
        }
    },
    timestamps: false
   
});

module.exports = Question;