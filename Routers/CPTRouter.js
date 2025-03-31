const express = require('express');
const router = express.Router();
const Session = require('../SessionModels/Session'); 
const Session_Answer = require('../SessionModels/Session_Answer');
const Question = require('../SessionModels/Question');
const Course = require('../SessionModels/Course');
const Answer = require('../SessionModels/Answer');
const { Op } = require('sequelize');

router.get('/sessions/details', async (req, res) => {
    try {
        //Fetch all sessions
        const sessions = await Session.findAll({
            attributes: ['entry_id', 'date', 'course_id'],
            raw: true,
        });

        if (!sessions.length) {
            return res.status(404).json({ error: 'No sessions found.' });
        }

        //Prepare results
        const results = [];

        //Loop through each session
        for (const session of sessions) {
            const sessionObj = { date: session.date };

            //Fetch course name
            const course = await Course.findByPk(session.course_id, {
                attributes: ['course_name'],
                raw: true,
            });

            sessionObj.course = course ? course.course_name : 'Unknown';

            //fetch answers for specific questions
            const sessionAnswers = await Session_Answer.findAll({
                where: {
                    entry_id: session.entry_id,
                    question_id: { [Op.in]: [26, 27, 30] },
                },
                attributes: ['question_id', 'answer_id'],
                raw: true,
            });

            //fetch corresponding answer texts
            const answerIds = sessionAnswers.map(sa => sa.answer_id);

            const answers = await Answer.findAll({
                where: { answer_id: { [Op.in]: answerIds } },
                attributes: ['answer_id', 'answer_text'],
                raw: true,
            });

            //map answers to their questions
            sessionAnswers.forEach(sa => {
                const answer = answers.find(a => a.answer_id === sa.answer_id);
                switch (sa.question_id) {
                    case 26:
                        sessionObj.reported_confidence = answer ? answer.answer_text : 'Unknown';
                        break;
                    case 27:
                        sessionObj.preparation = answer ? answer.answer_text : 'Unknown';
                        break;
                    case 30:
                        sessionObj.topic = answer ? answer.answer_text.split(/\r?\n/).map(t => t.trim()).reduce((acc, curr) => {
                            if (curr) {
                                acc[curr.toLowerCase()] = true;
                            }
                            return acc;
                        }, {}) : {};
                        break;
                    default:
                        break;
                }
            });
            

            results.push(sessionObj);
        }

        return res.status(200).json(results);

    } catch (error) {
        console.error('Error fetching session details:', error);
        return res.status(500).json({ error: 'Failed to fetch session details.' });
    }
});

module.exports = router;
