const express = require('express');
const router = express.Router();
const Session = require('../SessionModels/Session'); 

router.post('/sessions/parse-and-save', async (req, res) => {
    try {
        const { filePath } = req.body;
        if (!filePath) {
            return res.status(400).json({ error: 'filePath needed' });
        }
        const parsedData = await Session.parse(filePath);
        for (const data of parsedData) {
            await Session.save(data);
        }
        res.status(200).json({ message: 'All sessions saved' });
    } catch (error) {
        console.error('error when parsing or saving', error);
        res.status(500).json({ error: 'error occured' });
    }
});

module.exports = router;
