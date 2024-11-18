const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL') // storing the database on the computers memory
const SessionAnswer = require('./SessionAnswer')

const Answer = sequelize.define('Answer', {
    answer_text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SessionAnswer,
            key: 'answer_id'
        }
    },
    answer_int: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    timestamps: false
   
});

module.exports = Answer;