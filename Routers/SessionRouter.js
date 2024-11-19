const express = require('express');
const router = express.Router();
const Session = require('../SessionModels/Session'); // Adjust path as needed

// POST route for parse and save
router.post('/sessions/parse-and-save', async (req, res) => {
    try {
        const { filePath } = req.body; // Expect filePath in the request body

        if (!filePath) {
            return res.status(400).json({ error: 'filePath is required.' });
        }

        // Parse the file
        const parsedData = await Session.parse(filePath);

        // Save each parsed session
        for (const data of parsedData) {
            await Session.save(data);
        }

        res.status(200).json({ message: 'All sessions have been saved successfully.' });
    } catch (error) {
        console.error('Error during parsing or saving:', error);
        res.status(500).json({ error: 'An error occurred while processing the file.' });
    }
});

module.exports = router;
