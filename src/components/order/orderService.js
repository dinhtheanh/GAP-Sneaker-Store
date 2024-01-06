const Order = require('./orderModel')

const getOrdersbyId = async(userid)=>{
        try{
            const orders = await Order.find({ userID: userid }).populate('products.productId');
            return orders;

        }
        catch(error){
            throw error;
        }
}

const getOrdersByOrderId = async(orderId)=>{
    try{
        const orders = await Order.find({ _id: orderId }).populate('products.productId');
        return orders;

    }
    catch(error){
        throw error;
    }

}

const addOrder = async(products,totalPay,shippingMethod,userID) => {
    try {
        const formattedProducts = products.map(item => ({
            productId: item.product._id,
            quantity: item.quantity
          }));
          let shippingMethodName;

          switch (shippingMethod) {
              case 2:
                  shippingMethodName = 'Standart';
                  break;
              case 4:
                  shippingMethodName = 'Express';
                  break;
              case 10:
                  shippingMethodName = 'Next day';
                  break;
              default:
                  shippingMethodName = 'Unknown Shipping Method';
          }
          
        const newOrder = new Order({
            userID: userID,
            products: formattedProducts,
            totalPay: totalPay,
            shippingMethod: shippingMethodName,
        });

        // Save the new order to the database
        const savedOrder = await newOrder.save();

        // Return the saved order if needed
        return savedOrder;
    } catch (error) {
        console.error('Error adding order:', error);
        throw error; // Rethrow the error for higher-level error handling
    }
};

const getAllOrders = async () => {
    try {
        const orders = await Order.find();
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error('Unable to fetch orders');
    }
};

const findOrderByStatus = async (orderStatus, sort) => {
    try {
        console.log(orderStatus)
        console.log(sort)

        const ordersFound = await Order.find({ status: orderStatus }).sort(sort);
        return ordersFound;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error('Unable to fetch orders');
    }
}

const updateOrderStatus = async (orderID, newStatus) => {
    try {
        const order = await Order.findById(orderID);
        order.status = newStatus;
        await order.save();
        return order;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
}

module.exports ={
    addOrder,
    getOrdersbyId,
    findOrderByStatus,
    getAllOrders,
    getOrdersByOrderId,
    updateOrderStatus
}