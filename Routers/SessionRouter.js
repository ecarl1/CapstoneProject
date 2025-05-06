const express = require('express');
const router = express.Router();
const Session = require('../SessionModels/Session'); 
const Session_Answer = require('../SessionModels/Session_Answer');
const Question = require('../SessionModels/Question');
const multer = require('multer');
const path = require('path');
const UploadLog = require('../SessionModels/Upload_logs');

Session.hasOne(Session_Answer, {foreignKey: 'entry_id'})
// Session_Answer.belongsTo(Session, {foreignKey: 'entry_id'})

// Session.hasOne(Session_Answer)



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/upload-file', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Return the file path to the frontend
  res.status(200).json({ filePath: req.file.path });
});


router.post('/sessions/parse-and-save', async (req, res) => {
  let filePath = null;
  let filename = 'unknown';

  try {
      filePath = path.normalize(req.body.filePath);
      filename = path.basename(filePath);

      if (!filePath) {
          return res.status(400).json({ error: 'filePath needed' });
      }

      const parsedData = await Session.parse(filePath);

      await UploadLog.create({
        user_id: req.user?.id || 1, //have this be the actual user
        file_name: filename,
        filePath: filePath,
        date: new Date(), 
        status: 'success',
        message: `Parsed ${parsedData.length} session(s) successfully`
      });
      

      for (const data of parsedData) {
          await Session.save(data.sessionData, data.questionsData, data.answersData);
      }

      res.status(200).json({ message: 'All sessions saved' });

  } catch (error) {
      console.error('error when parsing or saving', error);

      await UploadLog.create({
        user_id: req.body.user_id || 1,
        file_name: filename,
        filePath: filePath,
        date: new Date(),
        status: 'error',
        message: error.message
      });
      

      res.status(500).json({ error: 'error occurred' });
  }
});


router.get('/sessions', async (req, res) => {
    try {
        const data = await Session.findAll(); // Fetch all data from the "session" table
        res.json(data); // Send the data as a JSON response
      } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve session data' });
      }
  });

router.get('/sessionsjoined', async (req, res) => {
    try {
        // const data = 
        await Session.findAll({
            include: [{
              model: Session_Answer
            //   where: [Session_Answer.entry_id = Session.entry_id],
            //   required: true,
             }]
          }).then(function(sessions) {
            // console.log(JSON.stringify(sessions))
            res.json(sessions)
          }); // Fetch all data from the "Session" table and join it with the 'session_Answer" table data
        // res.json(data); // Send the data as a JSON response
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve session data' });
    }
});  




router.get('/sessions_answers', async (req, res) => {
    try {
        const data = await Session_Answer.findAll(); // Fetch all data from the "session_answer" table
        res.json(data); // Send the data as a JSON response
      } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve session answer data' });
      }
});

router.get('/questions', async (req, res) => {
    try {
        const data = await Question.findAll(); // Fetch all data from the "Question" table
        res.json(data); // Send the data as a JSON response
      } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve question data' });
      }
});

router.get('/answers', async (req, res) => {
    try {
        const data = await Answer.findAll(); // Fetch all data from the "answer" table
        res.json(data); // Send the data as a JSON response
      } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve answer data' });
      }
});



module.exports = router;
