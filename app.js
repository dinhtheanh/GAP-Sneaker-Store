// Require necessary packages
const express = require('express');
const path = require('path');
require('dotenv/config');
const bodyParser = require('body-parser')
const navigationRoute = require('./src/routes/navigation.js');
//connect db
const mongoose = require("mongoose");

// Server Initialization 
const app = express();


// Configure Handlebars View Engine
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/src/views'));
app.set("view engine", "hbs");
app.use(bodyParser.json())
app.use("/", navigationRoute);

// Start the server
const PORT = process.env.PORT;
let server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
//Authentication database
const DB_AUTHENTICATION = process.env.MONGO_DB;
mongoose.connect(DB_AUTHENTICATION)
    .then(()=>{
        console.log("Connent to db success!");
    })
    .catch((err)=>{
        console.log(err);
    })

