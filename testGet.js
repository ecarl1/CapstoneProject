const axios = require('axios');

async function testGetSessions() {
    const baseURL = 'http://localhost:3000'; // Adjust if your server runs on a different port
    const endpoint = '/'; // Root endpoint of the session route

    try {
        const response = await axios.get(`${baseURL}${endpoint}`);

        console.log('Test Passed ✅ - Received response:');
        console.log(JSON.stringify(response.data, null, 2));

    } catch (error) {
        if (error.response) {
            console.error(`Test Failed ❌ - Server responded with status ${error.response.status}`);
            console.error('Response Data:', error.response.data);
        } else if (error.request) {
            console.error('Test Failed ❌ - No response received from the server.');
        } else {
            console.error('Test Failed ❌ - Error setting up request:', error.message);
        }
    }
}

testGetSessions();
