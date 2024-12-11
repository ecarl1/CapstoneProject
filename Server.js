const express = require('express');
const sessionRouter = require('./Routers/SessionRouter');
const muliselectRouter = require('./Routers/MultiselectRouter')
const userRouter = require('./Routers/UserRouter')

const app = express();

app.use(express.json()); 
app.use('/api/session', sessionRouter);
app.use('/api/multiselect', muliselectRouter);
app.use('/api/user', userRouter)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
