const Services = require("./homeService.js");

// Get all the home from the database
const gethomePage = async (req, res) => {
    //let newArrivals = await Services.getNewArrivals();
    //console.log(home);
    res.render("customer/navbar/home", { layout: "customer/layout"});
}

module.exports = {
    gethomePage
}