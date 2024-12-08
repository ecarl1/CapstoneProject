const axios = require('axios');
const path = require('path');
const User = require('./SessionModels/User')

async function testParseAndSaveRoute() {
    const filePath = path.join(__dirname, 'test.csv'); 
    const url = 'http://localhost:3000/api/sessions/parse-and-save'; 

    try {
        const diaply = await User.findUser("user", "pass");
        User.changePassword(1, 'stuff');
        const diaply2 = await User.findUser("user", "stuff");

      

        console.log(diaply);
        console.log(diaply2);

    } catch (error) {
        console.error('Error API CALL:', error.response?.data || error.message);
    }
}

testParseAndSaveRoute();
