const orderServices = require('./orderService');
const productServices = require('../product/productService');

const getOrderlistPage = async (req,res) =>{
    
    
    const orders = await orderServices.getOrdersbyId(req.user._id);

    console.log(orders[0])
    console.log(orders[0].products[0].productId.name);
    console.log(orders[0].products[0].quantity);
    
    
    res.render("customer/navbar/orderlist",{
        layout:"customer/layout",
        orders: orders
    });
}

module.exports = {
    getOrderlistPage,

}