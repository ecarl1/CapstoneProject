const axios = require('axios');
const path = require('path');
const User = require('./SessionModels/User')

async function testParseAndSaveRoute() {
    const filePath = path.join(__dirname, 'test.csv'); 
    const url = 'http://localhost:3000/api/sessions/parse-and-save'; 

    try {
        const response = await User.findUser("user", "pass")

        console.log(response);
    } catch (error) {
        console.error('Error API CALL:', error.response?.data || error.message);
    }
}

testParseAndSaveRoute();
