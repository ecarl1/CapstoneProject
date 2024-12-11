const express = require('express');
const router = express.Router();
const User = require('../SessionModels/User');

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

//Change Password Route
router.post('/change-password', async (req, res) => {
    try {
        const { user_id, newPassword } = req.body;

        if (!user_id || !newPassword) {
            return res.status(400).json({ error: 'User ID and new password are required' });
        }

        const result = await User.changePassword(user_id, newPassword);

        if (result === "user not found") {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ error: 'An error occurred while changing the password' });
    }
});

module.exports = router;
