// Requiring libraries
const express = require('express');
const path = require('path');
const bodyPartser = require('body-parser');
require('dotenv/config');
const mongoose = require('mongoose');
const handlebarsHelpers = require('./src/views/customHelpers.js');

// Import routing files
const adminRoute = require('./src/components/admin/adminRoute');

const app = express();

// Set the source of static files
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/src/views'));

// Set the view engine
app.set("view engine", "hbs");

// Set the body parser
app.use(bodyPartser.urlencoded({ extended: true }));
app.use(bodyPartser.json());

// Connect to the DB
mongoose.set("strictQuery", false);
EstablishConnection().catch((err) => console.error('Could not connect to MongoDB', err));

async function EstablishConnection(){
    await mongoose.connect(process.env.URL_DB).then(() => console.log('Connected to MongoDB'))
}

// Routing
app.use('/', adminRoute);

// Start server session
const PORT = process.env.PORT_FOR_ADMIN;
let server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

module.exports = app;

