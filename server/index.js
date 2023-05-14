//  Importing all packages
const express = require('express');
const connect = require('./src/config/db');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
// Controller routes
const userRoute = require('./src/routes/user.route')

const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use('/api/user', userRoute);

// Starting server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    try {
        connect();
        console.log(`Listening on ${PORT}`);
    } catch (error) {
        console.log({message: error.message})
    }
});