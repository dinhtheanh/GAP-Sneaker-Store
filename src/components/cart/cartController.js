const async = require('hbs/lib/async')
const Cart = require('./cartService')
const productService = require('../product/productService')
const order = require('../order/orderService')
const user = require('../account/accountService')
const addToCart = async(req,res) => {
    const userId = req.user._id;
    const productId = req.params.productid;
    const quantity = req.body.quantity;

    
    console.log(userId,productId,quantity);
    try {
        console.log(userId,productId,quantity)
        const response = await Cart.addToCart(userId,productId,quantity)
        if(response.status==='OK')
        {
            return res.status(200).json({message:response.message});
        }
        console.log(response)
        return res.status(400).json({error:response.message});

       
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    

}


const getProductCartPage = async (req, res) => {
    // const id = req.params.productid;
    // const product = await Services.getProductDetail(id);
    // //console.log(product);
    // const relatedProducts = await Services.getRelatedProducts(product.category, product.manufacturer, id);
    //console.log(relatedProducts);
    const productIds = req.user.cart.map(item => item.product)
    
    const product =await productService.getProductById(productIds)
    const products = product.map((product, index) => ({
        product,
        quantity: req.user.cart[index].quantity,
      }));
   
    res.render("customer/navbar/cart", {
         layout: "customer/layout" , 
         products:products,
        });
    //res.render("customer/navbar/cart", { layout: "customer/layout", activeTab: 'product', product: product, relatedProducts: relatedProducts });
};

const submitCheckout = async (req,res)=>{
    try{
        const productsToUpdate = req.body.products;
        const totalPay =  req.body.totalValue;
        const shippingMethod =  req.body.shippingMethod;
        for (let i = 0; i < productsToUpdate.length; i++)   {          // Assuming you have a database model called Product with a method updateStock
            let product = productsToUpdate[i].product._id;
            let quantity = productsToUpdate[i].quantity;
            await productService.updateStock(product, quantity);
        }

        

        await order.addOrder(productsToUpdate,totalPay,shippingMethod,req.user._id);
        await user.clearCart(req.user._id);
        res.status(200).json({message: 'Your order is successfully '});

    }
    catch(error){
        console.error('Error during checkout hêhe:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
    
};
const deleteProduct = async (req,res)=>{
    try{
        const product = req.body.data;
        const userid =  req.user;
       
        await Cart.deleteProduct(userid,product);
        
        res.status(200).json({message: 'Your order is successfully '});

    }
    catch(error){
        console.error('Error during checkout hêhe:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
    
};
module.exports = {
    getProductCartPage,
    addToCart,
    submitCheckout,
    deleteProduct

}