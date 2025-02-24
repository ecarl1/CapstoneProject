const {DataTypes, Sequelize} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL') // storing the database on the computers memory
const Session = require('./Session')
const Question = require('./Question')
const Answer = require('./Answer')

const Session_Answer = sequelize.define('Session_Answer', {

    //need to change this so there can be multiple answer and question ids
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



Session_Answer.saveSA = async function  (parsedData) {
    try{
        console.log(question_record.question_id);
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
        const Session_Answer = await Session_Answer.create({
            entry_id: parsedData.entry_id,
            question_id: question_record.question_id,
            answer_id: answer_record.answer_id
        })

    }catch(error){
        console.log(error);
    }
    
}



module.exports = Session_Answer;