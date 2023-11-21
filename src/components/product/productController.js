const getProductsPage = (req, res) => {
    res.render("customer/navigation/products", {layout: "customer/layout"});
}

module.exports = {
    getProductsPage
}