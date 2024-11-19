const {DataTypes, Sequelize} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL') // storing the database on the computers memory
const Session = require('./Session')
const Question = require('./Question')
const Answer = require('./Answer')

const SessionAnswer = sequelize.define('SessionAnswer', {
    answer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
       
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      
    },
    entry_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    }
   
},
{
    timestamps: false,
});



SessionAnswer.saveSA = async function  (parsedData) {
    try{
        await sequelize.sync()
        await Question.sync()
        const [question_record, question_new] = await Question.findOrCreate({
            where: { question_text: parsedData.question_text },
        });
        await sequelize.sync()

        await Answer.sync()
        await Question.sync()
        const [answer_record, answer_new] = await Answer.findOrCreate({
            where: { answer_text: parsedData.answer_text },
        });
        await sequelize.sync()

        await Answer.sync()
        await Question.sync()
        const sessionAnswer = await sessionAnswer.create({
            entry_id: parsedData.entry_id,
            question_id: question_record.question_id,
            answer_id: answer_record.answer_id
        })

    }catch(error){
        console.log(error);
    }
    
}



module.exports = SessionAnswer;