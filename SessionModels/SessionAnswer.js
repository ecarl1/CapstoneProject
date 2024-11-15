const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL') // storing the database on the computers memory
const Session = require('./Session')
const Answer = require('./Answer')
const {answerSave} = require('./Answer')
const {questionSave} = require('./Question')
const Question = require('./Question')


const SessionAnswer = sequelize.define('SessionAnswer', {
    answer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    question_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: function(){
            return Date.now();
        }
        //autoIncrement: true,
    },
    entry_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references:{
            model: Session,
            key: 'entry_id'
        }
    }
   
}, {
    timestamps: false // Corrected this to lowercase
}
);

// SessionAnswer.belongsTo(Question, {
//     foreignKey: 'question_id',
// });

// SessionAnswer.belongsTo(Answer, {
//     foreignKey: 'answer_id',
// });

// SessionAnswer.belongsTo(Session, {
//     foreignKey: 'entry_id',
// });

SessionAnswer.save = async function (data) {
    try{
        const sessionAnswer = await SessionAnswer.create({
            entry_id: data.entry_id,
        });
        await Answer.answerSave(data);
        await Question.questionSave(data);
    }catch(error){
        console.log(error);
    };
}



module.exports = SessionAnswer;