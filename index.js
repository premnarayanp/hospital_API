require('dotenv').config()
const port = process.env.PORT || 8396;
const express = require('express');
const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
const app = express();

// use post request  url
app.use(express.urlencoded());

//for json req/res
app.use(express.json());

//use routes
app.use('/', require('./routes'));

app.listen(port, function(error) {

    if (error) {
        console.log(`Error in running the server:${error}`);
    }
    console.log(`Server is running on port: ${port}`);
});