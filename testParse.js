const axios = require('axios');
const path = require('path');
const User = require('./SessionModels/User')


async function testParseAndSaveRoute() {
    //const filePath = path.join(__dirname, 'test.csv'); 
    const baseUrl = 'http://localhost:3000/api/user'; 


    try {
        //await User.create({ username: "testuser", password: "password123", fname: "John", lname: "Doe", pref_name: "Johnny", user_type: "user", email: "john.doe@example.com", user_id: 3 });
        const user = await User.findUser("testuser", "password123");
        console.log(user.User.lname)
       

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

      

        //console.log(diaply);
        //console.log(diaply2);

    } catch (error) {
        console.error('Error API CALL:', error.response?.data || error.message);
    }
}

testParseAndSaveRoute();
