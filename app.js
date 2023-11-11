const express = require('express');
const path = require('path');
require('dotenv/config');
const navigationRoute = require('./src/routes/navigation.js');
// Server Initialization 
const app = express();
// Configure Handlebars
app.set('views', path.join(__dirname, '/src/views'));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT;
app.use("/", navigationRoute);


let server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
