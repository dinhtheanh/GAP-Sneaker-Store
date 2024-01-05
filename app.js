// Require necessary packages
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const handlebarsHelpers = require('./src/views/customHelpers.js');
require('dotenv/config');
let initRouteWeb = require('./src/routes/navigation.js');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');


// Server Initialization 
const app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/src/views'));
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'theanhngu', // Add a strong, secure secret key
    resave: false,
    saveUninitialized: true,
    
    //store: MongoStore.create({ mongoUrl: process.env.URL_DB })
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Establishing the connection to the database
mongoose.set("strictQuery", false);
EstablishConnection().catch((err) => console.error('Could not connect to MongoDB', err));

async function EstablishConnection(){
    await mongoose.connect(process.env.URL_DB).then(() => console.log('Connected to MongoDB'))
}

app.use('/', initRouteWeb);
//app.use('/admin', adminRoute);


// Start the server
const PORT = process.env.PORT;
let server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

module.exports = app