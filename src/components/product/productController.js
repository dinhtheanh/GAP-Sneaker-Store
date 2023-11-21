const Services = require("./productService.js");

const getProductsPage = async (req, res) => {
    let products = await Services.getAllProducts();
    console.log(products);
    res.render("customer/navigation/products", {layout: "customer/layout", products: products});
}

module.exports = {
    getProductsPage
}