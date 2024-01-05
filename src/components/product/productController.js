const Services = require("./productService.js");
const User = require("../account/accountModel.js");

const async = require('hbs/lib/async')


function getIntersection(listA, listB) {
    const intersection = [];

    for (const itemA of listA) {
        for (const itemB of listB) {
            if (itemA.name === itemB.name) {
                intersection.push(itemA);
                break;
            }
        }
    }

    console.log(intersection)
    return intersection;
}


// Get all the products from the database
const getProductsPage = async (req, res) => {
    let products = [];
    
    let sortby = req.query.sortby || 'date';
    let colors = req.query.color || '';
    let categories = req.query.category || '';
    let brands = req.query.brand || '';
    let pricerange = req.query.price || '';

    let searchName = req.query.search || '';

    
    
    const allFiltersEmpty = (
        categories.length === 0 &&
        colors.length === 0 &&
        brands.length === 0 &&
        pricerange.length === 0
    );

    if (allFiltersEmpty) {
        filteredProducts = await Services.getAllProducts();
    } else {
        filteredProducts = await Services.getFilteredProducts(categories, colors, brands, pricerange);
    }

    if(searchName==='')
    {
        searchProduct = await Services.getAllProducts();
    }
    else{
        searchProduct = await Services.getProductByName(searchName);
    }
    const intersectedResults = getIntersection(filteredProducts, searchProduct);
    
    //let sortedProducts = [];
    // Sorting logic
    switch (sortby) {
        case 'date':
            products = await Services.prodsSortedByDate(intersectedResults);
            break;
        case 'price':
            products = await Services.prodsSortedByPrice(intersectedResults);
            break;
        case 'price-desc':
            products = await Services.prodsSortedByPriceDesc(intersectedResults);
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
        layout: "/customer/layout", 
        products: results.current, 
        pagination: results, 
        pages: pages,
        currentPage: page,
        activeTab: 'product',
        currentSort: sortby
    });
}

// Get the product detail page
const getProductDetailPage = async (req, res) => {
    const id = req.params.productid;
    const product = await Services.getProductDetail(id);
    //console.log(product);
    const relatedProducts = await Services.getRelatedProducts(product.category, product.manufacturer, id);
    //console.log(relatedProducts);
    res.render("customer/navbar/productdetail", { layout: "customer/layout", activeTab: 'product', product: product, relatedProducts: relatedProducts });
};


const addProduct = async (req, res) => {
    try {
       const name = req.body.name
       const price = req.body.price
       const category = req.body.category
       const size = req.body.size
       const color = req.body.color
       const brand = req.body.brand
       const image =req.body.imgurl
       
        if (!name || !price || !brand || !color || !size || !category|| !image) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }

        const response = await Services.addProduct(name,price,category,size,color,brand,image)
        const relatedProducts = await Services.getRelatedProducts(response.category, response.manufacturer, response.id_);
        //console.log(relatedProducts);
        res.render("customer/navbar/productdetail", { layout: "customer/layout", activeTab: 'product', product: response, relatedProducts: relatedProducts });
        

        res.render("admin/addProductForm", { layout: "admin/layout" })
    }
    catch (err) {
        return res.status(404).json({
            message: err
        })

    }
}
module.exports = {
    getProductsPage,
    addProduct,
    getProductDetailPage,
    
    
}