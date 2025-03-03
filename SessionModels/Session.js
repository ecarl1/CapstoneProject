const fs = require('fs');
const csv = require('csv-parser');

const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL'); 
const Course = require('./Course')
const Session_Answer = require('./Session_Answer')
const Answer = require('./Answer');
const Question = require('./Question')

const Session = sequelize.define('Session', {
    entry_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    
    sessionType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
    timestamps: false,
}
);

Session.upload = async function (file){
    //not sure what to do here
}

Session.parse = async function(filePath){
    const parsedData = [];
    let read = false;
    let count = 0;
    let answersData = [];
    let questionsData = [];
    let sessionData = null;

    await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv({separator: ',', quote: '"', escape:'"', relax_column_count: true, skip_empty_lines: true, headers: true}))
            .on('data', (row) => {
                if (count > 10) return;
                const rowValues = Object.values(row);

                if(!read){
                    if(rowValues.includes("Date")){
                        read = true;
                        return;
                    }
                }

                if (rowValues[10].includes("Does the student want the comment e-mailed to their professor?")) {
                    if (sessionData) {
                        parsedData.push({ sessionData, questionsData, answersData });
                        count++;
                    }
                    
                    answersData = [];
                    questionsData = [];
                    sessionData = {
                        date: rowValues[1],
                        course_name: rowValues[7].split(" ")[0],
                        sessionType: rowValues[8]
                    }
                }

                answersData.push(rowValues[11]);
                questionsData.push(rowValues[10]);
            })
            .on('end', async () => {
                for (const data of parsedData) {
                    await Session.save(data.sessionData, data.questionsData, data.answersData);
                }
                resolve();
            })
            .on('error', reject);
    });
};

Session.save = async function(sessionData, questionData, answerData) {
    const transaction = await sequelize.transaction();
    try{
        const [course_record, created_new] = await Course.findOrCreate({
            where: { course_name: sessionData.course_name},
            transaction
        });

        const session = await Session.create({
            date: sessionData.date,
            course_id: course_record.course_id,
            sessionType: sessionData.sessionType,
        }, { transaction });

        for (let i=0; i< questionData.length; i++) {
            const [question_record, question_new] = await Question.findOrCreate({
                where: {question_text: questionData[i]},
                transaction
            });

            const [answer_record, answer_new] = await Answer.findOrCreate({
                where: {answer_text: answerData[i]},
                transaction
            });

            await Session_Answer.create({
                entry_id: session.entry_id,
                question_id: question_record.question_id,
                answer_id: answer_record.answer_id
            }, { transaction });
        }

        await transaction.commit();
    } catch(error){
        await transaction.rollback();
        console.log(error);
    }
}

module.exports = Session;