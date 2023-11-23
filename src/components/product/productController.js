const Services = require("./productService.js");
const async = require('hbs/lib/async')

// Get all the products from the database
const getProductsPage = async (req, res) => {
    let products = await Services.getAllProducts();
    //console.log(products);
    res.render("customer/navbar/products", { layout: "customer/layout", products: products });
}
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
    addProduct
}