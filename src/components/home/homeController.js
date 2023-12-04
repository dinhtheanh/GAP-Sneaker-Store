const Services = require("./homeService.js");

// Get all the products on HOME from the database
const gethomePage = async (req, res) => {
    //let newArrivals = await Services.getNewArrivals();
    //console.log(home);
    res.render("customer/navbar/home", { layout: "customer/layout", activeTab: 'home'});
}

module.exports = {
    gethomePage
}