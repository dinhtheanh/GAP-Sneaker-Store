const orderServices = require('./orderService');
const productServices = require('../product/productService');

const getOrderlistPage = async (req,res) =>{
    
    
    const orders = await orderServices.getOrdersbyId(req.user._id);

    
    
    
    res.render("customer/navbar/orderlist",{
        layout:"customer/layout",
        orders: orders
    });
}

module.exports = {
    getOrderlistPage,

}