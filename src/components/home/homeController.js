const Services = require("./homeService.js");
const Product = require('../product/productService.js')
// Get all the products on HOME from the database
const gethomePage = async (req, res) => {
    //let newArrivals = await Services.getNewArrivals();
    //console.log(home);
    const highest = await Product.getHighestProduct();
    const newArrivals= await Product.getLatestProducts();
    const favor = await Product.getExProduct();
    res.render("customer/navbar/home", { layout: "customer/layout", activeTab: 'home',latest:newArrivals,fav:favor,best:highest});
}

module.exports = {
    gethomePage
}