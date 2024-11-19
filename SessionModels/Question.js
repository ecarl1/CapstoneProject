const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL') // storing the database on the computers memory
const Session_Answer = require('./Session')

const Question = sequelize.define('Question', {
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    question_text: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
  }, {
    timestamps: false,
  });
  

module.exports = Question;