const fs = require('fs');
const csv = require('csv-parser');

const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL'); // storing the database on the computers memory
const { defaultValueSchemable } = require('sequelize/lib/utils');
const Course = require('./Course')


const Session = sequelize.define('Session', {
    entry_id:{
        type: DataTypes.INTEGER,
        default: DataTypes.DATE,
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
        console.log(course_record.course_id)
        const session = await Session.create({
            date: parsedData.date,
            //need to search for course ID based on course name in the course section on the database
           
            course_id: course_record.course_id,
            sessionType: parsedData.sessionType,
        });
    }catch(error){
        console.log(error);
    };

    
}

module.exports = Session;