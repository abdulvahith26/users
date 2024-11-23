// import express
const express = require('express');
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');


// create an express app
const app = express();

// add middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

// add middleware to parse cookies
app.use(cookieParser());


// define the root route
app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
    res.redirect('/api/v1/auth' );
});
app.get('/api/v1/auth', (req, res) => {
    res.json({
        sucess: true ,
         message : " connect  to the DB , welcome to /api/v1/auth" });
    });


// export the app
module.exports = app;