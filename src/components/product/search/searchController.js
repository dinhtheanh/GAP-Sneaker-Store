const Services = require("../productService.js");
const async = require('hbs/lib/async')
const productModel = require('../productModel.js')
const getSearchProducts = async (req,res)=>{
    try {
        let payload = req.body.payload.trim();
        
        let search = await productModel.find({ name: { $regex: new RegExp(payload, 'i') } }).exec();


        search = search.slice(0,7);
        // Perform any additional logic here

        // Send a response back to the client
        res.status(200).send({ result: 'success', payload: search });
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: 'error', message: 'Internal server error' });
    }
};
const getSearchProductsPage = async (req,res)=>{
    let products = [];
    let sortby = req.query.sortby || 'date';
    //let sortedProducts = [];
    // Sorting logic
    switch (sortby) {
        case 'date':
            products = await Services.prodsSortedByDate();
            break;
        case 'price':
            products = await Services.prodsSortedByPrice();
            break;
        case 'price-desc':
            products = await Services.prodsSortedByPriceDesc();
            break;
        // Add other cases for different sorting methods
    }
    //products = sortedProducts;
    // res.render("customer/navbar/products", { layout: "customer/layout", products: products, activeTab: 'product' });
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 3;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;

    let results = {};

    if (endIndex < products.length) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }
    let totalPages = Math.ceil(products.length / limit);
    let pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    results.current = products.slice(startIndex, endIndex);
    res.render('customer/navbar/products', {
        layout: "/customer/layout", products: results.current, pagination: results, pages: pages,
        currentPage: page,
        activeTab: 'product',
        currentSort: sortby
    });
};

  
module.exports = {
   getSearchProducts,
   getSearchProductsPage
}