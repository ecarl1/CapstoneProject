const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL') // storing the database on the computers memory
const Session = require('./Session')

const SessionAnswer = sequelize.define('SessionAnswer', {
    answerID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    questionID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    entryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Session,
            key: 'entryID'
        }
    }
   
});



module.exports = SessionAnswer;