const User = require('../CapstoneProject/SessionModels/User'); // Adjust based on your file structure
const bcrypt = require('bcrypt');

async function createTestUser() {
    try {
        // Define test user data
        const userData = {
            user_id: 2, // Ensure this ID is unique in your DB
            username: 'Ericuser',
            password: 'testpassword',
            fname: 'John',
            lname: 'Doe',
            pref_name: 'Johnny',
            user_type: 'admin',
            email: 'testuser@example.com',
        };

        // Check if user already exists
        const existingUser = await User.findOne({ where: { username: userData.username } });

        if (existingUser) {
            console.log('User already exists in the database.');
            return;
        }

        // Create the user in your database
        const newUser = await User.create(userData);

        console.log('New user created:', newUser.toJSON());
    } catch (error) {
        console.error('Error creating test user:', error);
    }
}

// Run the function
createTestUser();
