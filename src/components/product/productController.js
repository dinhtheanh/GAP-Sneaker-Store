const Services = require("./productService.js");

// Get all the products from the database
const getProductsPage = async (req, res) => {
    let products = await Services.getAllProducts();
    //console.log(products);
    res.render("customer/navigation/products", {layout: "customer/layout", products: products});
}

module.exports = {
    getProductsPage
}