const sequelize = require('../config/TESTDATABASESQL');
const Answer = require('./Answer');
const Question = require('./Question.js/index.js');
const Session = require('./Session.js');
const SessionAnswer = require('./SessionAnswer');

Session.hasMany(SessionAnswer, {foreignKey: 'entryID'});
SessionAnswer.belongsTo(Session, {foreignKey: 'entryID'});
SessionAnswer.hasOne(Answer, {foreignKey: 'answerID'});
Answer.belongsTo(SessionAnswer, {foreginKey: 'answerID'});
SessionAnswer.hasOne(Question, {foreginKey: 'questionID'});
Question.belongsTo(SessionAnswer, {foreginKey: 'questionID'});



module.exports = {
    sequelize,
    Answer,
    Question,
    Session,
    SessionAnswer
}