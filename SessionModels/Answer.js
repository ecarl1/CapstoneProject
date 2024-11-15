const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL') // storing the database on the computers memory
const SessionAnswer = require('./SessionAnswer')

class Answer extends Model{}

Answer.init( {
    answer_text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    //this needs to be set to assign an int
    answer_int: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
   
}, {
    sequelize,
    modelName: 'Answer',
    tableName: 'answer',
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