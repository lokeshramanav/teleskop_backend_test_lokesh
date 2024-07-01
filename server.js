require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fileRoutes = require('./handler/routes/file.routes');
const userRoutes = require('./handler/routes/user.routes');

const { environment }  = require('./config/config');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Health Check : OK!' });
});

app.use('/file', fileRoutes);
app.use('/user', userRoutes);

app.listen(environment.port, () => {
    console.log(`${environment.env} Server is running on port ${environment.port}`);
});