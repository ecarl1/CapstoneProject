const axios = require('axios');
const path = require('path');

async function testParseAndSaveRoute() {
    const filePath = path.join(__dirname, 'test.csv'); 
    const url = 'http://localhost:3000/api/sessions/parse-and-save'; 

    try {
        const response = await axios.post(url, { filePath });

        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error API CALL:', error.response?.data || error.message);
    }
}

testParseAndSaveRoute();
