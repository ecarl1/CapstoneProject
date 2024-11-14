const { parseSessionData, sessionSave } = require('./ParseSessionData'); // Import both functions
const path = require('path');

async function testParseAndSave() {
    const filePath = path.join(__dirname, 'test.csv'); // Adjust to the correct test file path
    console.log(filePath);

    try {
        const parsedData = await parseSessionData(filePath);

       
        for (const data of parsedData) {
            await sessionSave(data); 
        }

        console.log('All sessions have been saved successfully.');
    } catch (error) {
        console.error('Error during parsing or saving:', error);
    }
}

testParseAndSave();
