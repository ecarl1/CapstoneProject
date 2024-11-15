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
        primaryKey: true,
        references: {
            model: SessionAnswer,
            key: 'answer_id'
        }
    },
    //this needs to be set to assign an int
    answer_int: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
   
}, {
    timestamps: false // Corrected this to lowercase
});

Answer.answerSave = async function (data) {
    try{
        const answer = await Answer.create({
            answer_text: data.answer_text,
            answer_id: data.answer_id
        });
    }catch(error){
        console.log(error);
    };
}


module.exports = Answer;