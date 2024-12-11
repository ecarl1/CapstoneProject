const express = require('express');
const router = express.Router();
const Question = require('../SessionModels/Question');
const Answer = require('../SessionModels/Answer');
const Session_Answer = require('../SessionModels/Session_Answer'); 

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

//will need to work on getting an entry count and how to do this
//need the muliselect data to be specified in order to better understand how to do this

module.exports = router;
