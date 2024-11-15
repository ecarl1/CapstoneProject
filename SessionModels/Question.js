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
        primaryKey: true,
        references: {
            model: SessionAnswer,
            key: 'question_id'
        }
    }
   
}, {
    timestamps: false // Corrected this to lowercase
});

Question.questionSave = async function (data) {
    try{
        const question = await Question.create({
            question_text: data.question_text,
            question_id: data.question_id
        });
    }catch(error){
        console.log(error);
    };
}

module.exports = Question;