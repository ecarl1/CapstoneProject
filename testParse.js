const axios = require('axios');
const path = require('path');
const User = require('./SessionModels/User')

async function testParseAndSaveRoute() {
    //const filePath = path.join(__dirname, 'test.csv'); 
    const baseUrl = 'http://localhost:3000/api/user'; 

    try {
        const diaply = await User.findUser("user", "newStuff");
        //User.changePassword(1, 'stuff');
        //const diaply2 = await User.findUser("user", "stuff");
        console.log('Testing Login Route...');
        const loginResponse = await axios.post(`${baseUrl}/login`, {
            username: 'user', // Replace with a valid username
            password: 'newStuff', // Replace with the correct password
        });
        console.log('Login Response:', loginResponse.data);

        // console.log('Testing Change Password Route...');
        // const changePasswordResponse = await axios.post(`${baseUrl}/change-password`, {
        //     user_id: 1, 
        //     newPassword: 'newStuff', 
        // });
        // console.log('Change Password Response:', changePasswordResponse.data);

        // console.log('Verifying New Password...');
        // const verifyLoginResponse = await axios.post(`${baseUrl}/login`, {
        //     username: 'user', 
        //     password: 'newStuff',
        // });
        // console.log('Verify Login Response:', verifyLoginResponse.data);

      

        console.log(diaply);
        //console.log(diaply2);

    } catch (error) {
        console.error('Error API CALL:', error.response?.data || error.message);
    }
}

testParseAndSaveRoute();
