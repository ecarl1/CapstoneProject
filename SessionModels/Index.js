const sequelize = require('../config/TESTDATABASESQL');
const Answer = require('./Answer');
const Question = require('./Question.js/index.js');
const Session = require('./Session.js');
const SessionAnswer = require('./SessionAnswer');

function defineAssociations(){
    Session.hasMany(SessionAnswer, {foreignKey: 'entry_id'});
    SessionAnswer.belongsTo(Session, {foreignKey: 'entry_id'});
    SessionAnswer.hasOne(Answer, {foreignKey: 'answer_id'});
    Answer.belongsTo(SessionAnswer, {foreginKey: 'answer_id'});
    SessionAnswer.hasOne(Question, {foreginKey: 'question_id'});
    Question.belongsTo(SessionAnswer, {foreginKey: 'question_id'});
}







module.exports = {
    sequelize,
    Answer,
    Question,
    Session,
    SessionAnswer
}