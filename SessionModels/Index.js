const sequelize = require('../config/TESTDATABASESQL');
const Answer = require('./Answer');
const Question = require('./Question.js/index.js');
const Session = require('./Session.js');
const Session_Answer = require('./Session_Answer.js');

// Session.hasMany(Session_Answer, {foreignKey: 'entryID'});
// Session_Answer.belongsTo(Session, {foreignKey: 'entryID'});
// Session_Answer.hasOne(Answer, {foreignKey: 'answerID'});
// Answer.belongsTo(Session_Answer, {foreginKey: 'answerID'});
// Session_Answer.hasOne(Question, {foreginKey: 'questionID'});
// Question.belongsTo(Session_Answer, {foreginKey: 'questionID'});



module.exports = {
    sequelize,
    Answer,
    Question,
    Session,
    Session_Answer
}