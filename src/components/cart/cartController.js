const async = require('hbs/lib/async')


const getProductCartPage = async (req, res) => {
    // const id = req.params.productid;
    // const product = await Services.getProductDetail(id);
    // //console.log(product);
    // const relatedProducts = await Services.getRelatedProducts(product.category, product.manufacturer, id);
    //console.log(relatedProducts);
    res.render("customer/navbar/cart", { layout: "customer/layout" });
    //res.render("customer/navbar/cart", { layout: "customer/layout", activeTab: 'product', product: product, relatedProducts: relatedProducts });
};
module.exports = {
    getProductCartPage
}