const express = require('express');
const cors = require("cors");

const sessionRouter = require('./Routers/SessionRouter');
const multiSelectRouter = require('./Routers/MultiselectRouter');
const userRouter = require('./Routers/UserRouter');
const attendanceRouter = require('./Routers/AttendanceRouter')
const courseRouter = require('./Routers/CourseRouter')
const CPTRouter = require('./Routers/CPTRouter')
const Upload_logRouter = require('./Routers/Upload_logRouter')

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use('/api/session', sessionRouter);
app.use('/api/multiselect', multiSelectRouter);
app.use('/api/user', userRouter);
app.use('/api/attendance', attendanceRouter)
app.use('/api/course', courseRouter)
app.use('/api/CPT', CPTRouter)
app.use('/upload', Upload_logRouter)


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
