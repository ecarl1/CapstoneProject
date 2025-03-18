const express = require('express');
const router = express.Router();
const Session = require('../SessionModels/Session'); 


router.get('/', async (req, res) => {
    try {
        const data = await Session.findAll({attributes: ['date', 'course_name']}); // Fetch all data from the "session" tabl
        res.json(data); // Send the data as a JSON response
      } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve session data' });
      }
  });

module.exports = router