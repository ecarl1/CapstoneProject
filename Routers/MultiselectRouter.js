const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize'); // Sequelize functions
const Question = require('../SessionModels/Question');
const Answer = require('../SessionModels/Answer');
const Session_Answer = require('../SessionModels/Session_Answer'); 
const Course = require('../SessionModels/Course');
const Session = require('../SessionModels/Session');  // Adjust if needed



//getting all questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.findAll({
            attributes: ['question_id', 'question_text'], 
        });
        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions.' });
    }
});

//getting all questions
//create a call with that passes in a specific question id 

router.get('/questions/:id/answer-counts', async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the question to ensure it exists
        const question = await Question.findByPk(id, {
            attributes: ['question_id', 'question_text'],
        });

        if (!question) {
            return res.status(404).json({ error: 'Question not found.' });
        }

        // Fetch answer counts from the Session_Answer table
        const answerCounts = await Session_Answer.findAll({
            where: { question_id: id },
            attributes: [
                'answer_id',
                [Sequelize.fn('COUNT', Sequelize.col('answer_id')), 'count'],
            ],
            group: ['answer_id'],
            raw: true,
        });

        if (answerCounts.length === 0) {
            return res.status(404).json({ error: 'No answers found for this question.' });
        }

        // Extract answer IDs from answerCounts to fetch answer texts
        const answerIds = answerCounts.map(a => a.answer_id);

        // Fetch answer texts from the Answer table
        const answers = await Answer.findAll({
            where: { answer_id: { [Op.in]: answerIds } },
            attributes: ['answer_id', 'answer_text'],
            raw: true,
        });

        // Map answerCounts with corresponding answer_texts
        const results = answerCounts.map(ac => {
            const answer = answers.find(a => a.answer_id === ac.answer_id);
            return {
                answer_id: ac.answer_id,
                answer_text: answer ? answer.answer_text : 'Unknown',
                count: ac.count,
            };
        });

        res.status(200).json({
            question: {
                question_id: question.question_id,
                question_text: question.question_text,
            },
            answers: results,
        });

    } catch (error) {
        console.error('Error fetching answer counts:', error);
        res.status(500).json({ error: 'Failed to fetch answer counts.' });
    }
});

//getting specific question by ID
router.get('/questions/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const question = await Question.findByPk(id, {
            attributes: ['question_id', 'question_text'],
        });
        if (!question) {
            return res.status(404).json({ error: 'Question not found.' });
        }
        res.status(200).json({ question });
    } catch (error) {
        console.error('Error fetching question:', error);
        res.status(500).json({ error: 'Failed to fetch question.' });
    }
});

//getting all answers
router.get('/answers', async (req, res) => {
    try {
        const answers = await Answer.findAll({
            attributes: ['answer_id', 'answer_text', 'answer_int'],
        });
        res.status(200).json({ answers });
    } catch (error) {
        console.error('Error fetching answers:', error);
        res.status(500).json({ error: 'Failed to fetch answers.' });
    }
});

//getting specific answer by ID
router.get('/answers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const answer = await Answer.findByPk(id, {
            attributes: ['answer_id', 'answer_text', 'answer_int'],
        });
        if (!answer) {
            return res.status(404).json({ error: 'Answer not found.' });
        }
        res.status(200).json({ answer });
    } catch (error) {
        console.error('Error fetching answer:', error);
        res.status(500).json({ error: 'Failed to fetch answer.' });
    }
});

//getting answers for a specific question
router.get('/questions/:id/answers', async (req, res) => {
    const { id } = req.params;
    try {
        const answers = await Session_Answer.findAll({
            where: { question_id: id },
            include: [
                {
                    model: Answer,
                    attributes: ['answer_id', 'answer_text', 'answer_int'],
                },
            ],
            attributes: ['answer_id'], 
        });

        if (answers.length === 0) {
            return res.status(404).json({ error: 'No answers found for this question.' });
        }
        res.status(200).json({ answers });
    } catch (error) {
        console.error('Error fetching answers for question:', error);
        res.status(500).json({ error: 'Failed to fetch answers for question.' });
    }
});

router.get('/skills', async (req, res) => {
  try {
    const sessions = await Session.findAll({
      attributes: ['entry_id', 'date', 'course_id'],
      raw: true,
    });

    if (!sessions.length) {
      return res.status(404).json({ error: 'No sessions found.' });
    }

    const results = [];

    for (const session of sessions) {
      const sessionObj = { date: session.date };

      const course = await Course.findByPk(session.course_id, {
        attributes: ['course_name'],
        raw: true,
      });

      sessionObj.course = course ? course.course_name : 'Unknown';

      const sessionAnswers = await Session_Answer.findAll({
        where: {
          entry_id: session.entry_id,
          question_id: 22,
        },
        attributes: ['answer_id'],
        raw: true,
      });

      if (sessionAnswers.length === 0) {
        console.log(`No answers found for session ${session.entry_id}`);
      }

      const answerIds = sessionAnswers.map(sa => sa.answer_id);

      const answers = await Answer.findAll({
        where: {
          answer_id: { [Op.in]: answerIds },
          answer_text: { [Op.ne]: '' },
        },
        attributes: ['answer_text'],
        raw: true,
      });

      sessionObj.answer_texts = answers.length > 0 ? answers.map(a => a.answer_text) : [];

      results.push(sessionObj);
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching session details:', error);
    return res.status(500).json({ error: 'Failed to fetch session details.', message: error.message });
  }
});




//will need to work on getting an entry count and how to do this
//need the muliselect data to be specified in order to better understand how to do this

module.exports = router;
