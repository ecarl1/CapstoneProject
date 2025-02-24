const fs = require('fs');
const csv = require('csv-parser');

const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL'); 
const { defaultValueSchemable } = require('sequelize/lib/utils');
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

//has to be refined 
Session.parse = async function(filePath){
    //const parsedText = { entryID: {}, date: {}, sessionType: {}, courseID: {}}
    const parsedData = [];
    let read = false;
    let count = 0;
    await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv({separator: ',', quote: '"', escape:'"', relax_column_count: true, skip_empty_lines: true, headers: true}))
            .on('data', (row) => {
                const rowValues = Object.values(row);
                if(!read){
                    if(rowValues.includes("Date")){
                        read = true;
                        return;
                    }
                }
                else if(read && count < 8){
                    //console.log('Row Values:', rowValues);
                    console.log(rowValues[1]);

                    //fix this 
                    //column k has the topics, questions, and confidence and prep
                    //I am going to need to enure that each item on the columnn is stored 
                    //appropiately as opposed to being stored as just questions
                    const parsedRow ={
                        date: rowValues[1],
                        course_name: rowValues[7].split(" ")[0],
                        sessionType: rowValues[8],
                        question_text: rowValues[10],
                        answer_text: rowValues[11]


                    };
                    parsedData.push(parsedRow);
                    console.log(parsedRow);
                    count++;
                }
            })
            .on('end', resolve)
            .on('error', reject);
    });

    

    return parsedData;
};

Session.save = async function (parsedData) {
    try{

        await Course.sync()
        
        // Get related course id
        const [course_record, created_new] = await Course.findOrCreate({
            where: { course_name: parsedData.course_name },
        });
        //console.log(course_record.course_id)

        
        // const [question_record, question_new] = await Question.findOrCreate({
        //     where: { question_text: parsedData.question_text },
        // });

        await Question.sync()
        const [question_record, question_new] = await Question.findOrCreate({
            where: { question_text: parsedData.question_text },
        });

        await Answer.sync()
        const [answer_record, answer_new] = await Answer.findOrCreate({
            where: { answer_text: parsedData.answer_text },
        });

       


        const session = await Session.create({
            date: parsedData.date,
            //need to search for course ID based on course name in the course section on the database
           
            course_id: course_record.course_id,
            sessionType: parsedData.sessionType,
        });

        await Session_Answer.create({
            entry_id: session.entry_id,
            question_id: question_record.question_id,
            answer_id: answer_record.answer_id
        })

        //!!!!!!
        //this need to be a create / create needs to be calld first 
        //const Session_Answer = await Session_Answer.saveSA(parsedData);
        
    }catch(error){
        console.log(error);
    };

    
}

module.exports = Session;