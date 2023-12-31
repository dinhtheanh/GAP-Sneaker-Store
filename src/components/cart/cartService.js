const User = require('../account/accountModel')
const Product = require('../product/productModel')
const ProductSer = require('../product/productService')

const deleteProduct = async (userid,productid) =>{
   try{
        const user = await User.findById(userid)
        user.cart = user.cart.filter(item => item.product.toString() !== productid);

        await user.save();
      
        return {
            status: 'OK',
            message: 'Product is added to cart successfully'
          }
    } catch (error) {
          console.error(error);
          throw error;
    }
};
const addToCart = async (userId,productId,quantity) =>{
    try{
      console.log("Adding to cart in cart Service")
        const product = await Product.findById(productId);
        const user = await User.findById(userId)
        if(quantity>product.stock){
          return {status:'ERR',message:'Product in stock do not enough'};
        }
        product.stock-=quantity;
          if (!user.cart) {
            user.cart = [];
          }
      
          // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
          const existingCartItem = user.cart.find(item => item.product.equals(product._id));
          await ProductSer.updateStock(product._id,quantity);
          if (existingCartItem) {
            // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
            const quantityToAdd = parseInt(quantity, 10) || 1;
            existingCartItem.quantity += quantityToAdd;
          } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
            user.cart.push({ product: product._id, quantity: quantity });
          }
      
          await user.save();
      
          return {
            status: 'OK',
            message: 'Product is added to cart successfully'
          }
    } catch (error) {
          console.error(error);
          throw error;
    }
};

module.exports = {
  addToCart,
  deleteProduct
}