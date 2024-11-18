const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL') // storing the database on the computers memory
const Session = require('./Session')

const SessionAnswer = sequelize.define('SessionAnswer', {
    answer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    entry_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Session,
            key: 'entry_id'
        }
    },
    timestamps: false
   
});



module.exports = SessionAnswer;