const express = require('express');
const sessionRouter = require('./Routers/SessionRouter');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api', sessionRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
