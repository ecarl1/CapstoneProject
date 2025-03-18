const express = require('express');
const router = express.Router();
const Session = require('../SessionModels/Session'); 
const Course = require('../SessionModels/Course')


router.get('/', async (req, res) => {
  try {
    //Fetch all sessions with date and course_id
    const sessions = await Session.findAll({
        attributes: ['date', 'course_id'] 
    });

    //Fetch course names for each course_id
    const courseIds = sessions.map(session => session.course_id); //Extract all course_ids
    const courses = await Course.findAll({
        where: { course_id: courseIds }, 
        attributes: ['course_id', 'course_name'] 
    });

    //Convert courses array into a lookup dictionary
    const courseMap = {};
    courses.forEach(course => {
        courseMap[course.course_id] = course.course_name;
    });

    //Replace course_id with course_name
    const formattedData = sessions.map(session => ({
        date: session.date,
        course_name: courseMap[session.course_id] || "Unknown Course" 
    }));

    //Send response
    res.json(formattedData);
} catch (err) {
    console.error("Error fetching session data:", err);
    res.status(500).json({ error: 'Failed to retrieve session data' });
}
});


module.exports = router

