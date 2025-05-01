const express = require('express');
const router = express.Router();
const User = require('../SessionModels/User');
const bcrypt = require("bcrypt");

//Login Route
router.post('/login', async (req, res) => {
    try {
        console.log('sadasdasda');
        console.log('Received Body:', req.body);
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await User.findUser(username, password);

        if (typeof user === 'string') {
            return res.status(401).json({ error: user }); 
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

// //reset Password Route
// router.post('/reset-password', async (req, res) => {
//     try {
//         const { user_id, newPassword } = req.body;

//         if (!user_id || !newPassword) {
//             return res.status(400).json({ error: 'User ID and new password are required' });
//         }

//         const result = await User.changePassword(user_id, newPassword);

//         if (result === "user not found") {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.status(200).json({ message: 'Password changed successfully' });
//     } catch (error) {
//         console.error('Error during password change:', error);
//         res.status(500).json({ error: 'An error occurred while changing the password' });
//     }
    
// });

//route for changing password
router.post("/change-password", async (req, res) => {
    try {
        console.log("Received password change request:", req.body);

        const { username, oldPassword, newPassword } = req.body;

        //requires all fields
        if (!username || !oldPassword || !newPassword) {
            console.error("Missing required fields:", req.body);
            return res.status(400).json({ message: "All fields are required" });
        }

        //Find user by username
        const user = await User.findOne({ where: { username } });
        console.log("User found:", user ? user.toJSON() : "No user found");

        if (!user) {
            console.error("User not found:", username);
            return res.status(404).json({ message: "User not found" });
        }

        //changing the password from the user model
        await User.changePassword(username, oldPassword, newPassword);
    

       

        console.log("Password changed successfully for user:", username);
        res.json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error in /change-password route:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, password, fname, lname, pref_Name, user_type, email } = req.body;

        // Check if username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create the user (password is hashed automatically in the model)
        const newUser = await User.create({
            username,
            password,  
            fname,
            lname,
            pref_Name,
            user_type,
            email,
        });

        res.status(201).json({ message: 'User created successfully', user: { username: newUser.username, email: newUser.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});







module.exports = router;
