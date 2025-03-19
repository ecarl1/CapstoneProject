const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const Session = require('../SessionModels/Session'); 
const Course = require('../SessionModels/Course');
const { raw } = require('mysql2');

router.get('/courses', async (req, res) => {
    try{
        const courses = await Course.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('course_name')), 'course_name']], 
            raw: true,
        });

        res.json(courses);
    } catch (error){
        console.error(" Error fetching unique courses:", error);
        res.status(500).json({ error: "Failed to fetch unique courses" });
    }
});

module.exports = router