const Services = require("./productService.js");
const async = require('hbs/lib/async')

// Get all the products from the database
const getProductsPage = async (req, res) => {
    let products = await Services.getAllProducts();
    res.render("customer/navbar/products", { layout: "customer/layout", products: products, activeTab: 'product' });
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


const addProduct = async (req,res)=>{
    try{
        const {name,price,brand,gender,sizes,category}= req.body
       
        if(!name||!price||brand||gender||sizes||category)
        {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        

        const response = await userSevice.addProduct(req.body)
        
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(404).json({
            message :err
        })

    }
}
module.exports = {
    getProductsPage,
    addProduct,
    getProductDetailPage,
}