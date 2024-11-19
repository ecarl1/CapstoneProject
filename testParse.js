const axios = require('axios');
const path = require('path');

async function testParseAndSaveRoute() {
    const filePath = path.join(__dirname, 'test.csv'); // Path to your test file
    const url = 'http://localhost:3000/api/sessions/parse-and-save'; // Adjust path if needed

    try {
        console.log(`Sending filePath: ${filePath} to ${url}`);
        const response = await axios.post(url, { filePath });

        console.log('Response from server:', response.data);
    } catch (error) {
        console.error('Error during API call:', error.response?.data || error.message);
    }
}

testParseAndSaveRoute();
