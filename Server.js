const express = require('express');
const cors = require("cors");

const sessionRouter = require('./Routers/SessionRouter');
const multiSelectRouter = require('./Routers/MultiselectRouter');
const userRouter = require('./Routers/UserRouter');

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use('/api/session', sessionRouter);
app.use('/api/multiselect', multiSelectRouter);
app.use('/api/user', userRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
