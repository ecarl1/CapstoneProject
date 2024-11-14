const fs = require('fs');
const csv = require('csv-parser');
const Session = require('./SessionModels/Session')

//const Session = require('./SessionModels/Session')

async function parseSessionData(filePath) {
    const parsedData = [];
    let path = filePath

    

    let read = false;
    let count = 0;
    await new Promise((resolve, reject) => {
        fs.createReadStream(path)
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
}

async function sessionSave(parsedData) {
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

module.exports = {parseSessionData, sessionSave };
