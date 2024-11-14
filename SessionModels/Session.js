const fs = require('fs');
const csv = require('csv-parser');

const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL'); // storing the database on the computers memory
const { defaultValueSchemable } = require('sequelize/lib/utils');

const Session = sequelize.define('Session', {
    entryID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    sessionType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    courseID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: false,
    updatedAt: false
});

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

                    
                    const parsedRow ={
                        date: rowValues[1],
                        courseID: rowValues[7].split(" ")[0],
                        courseName: rowValues[7].split(" ").slice(1).join(" "),
                        sessionType: rowValues[8],
                        questionText: rowValues[10],
                        answerText: rowValues[11]


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
        const session = await Session.create({
            date: parsedData.date,
            courseID: parsedData.courseID,
            sessionType: parsedData.sessionType,
        });
    }catch(error){
        console.log(error);
    };

    
}

module.exports = Session;