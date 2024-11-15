const sequelize = require('../config/TESTDATABASESQL');
const Answer = require('./Answer');
const Question = require('./Question');
const Session = require('./Session.js');
const SessionAnswer = require('./SessionAnswer');

Session.init(sequelize);
SessionAnswer.init(sequelize);
Question.init(sequelize);
Answer.init(sequelize);


function defineAssociations() {
    Session.hasMany(SessionAnswer, { foreignKey: 'entry_id' });
    SessionAnswer.belongsTo(Session, { foreignKey: 'entry_id' });
    SessionAnswer.hasOne(Answer, { foreignKey: 'answer_id' });
    Answer.belongsTo(SessionAnswer, { foreignKey: 'answer_id' }); 
    SessionAnswer.hasOne(Question, { foreignKey: 'question_id' }); 
    Question.belongsTo(SessionAnswer, { foreignKey: 'question_id' }); 
}








module.exports = () => {
   console.log('Associations defined');
}