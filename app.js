// Require necessary packages
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const handlebarsHelpers = require('./src/views/customHelpers.js'); // Custom Handlebars Helpers
require('dotenv/config');
let initRouteWeb = require('./src/routes/navigation.js');
const bodyParser = require('body-parser');



// Server Initialization 
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', initRouteWeb);


// Establishing the connection to the database
mongoose.connect(process.env.URL_DB)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

// Configure Handlebars View Engine
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/src/views'));
app.set("view engine", "hbs");
// Start the server
const PORT = process.env.PORT;
let server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


module.exports = app
