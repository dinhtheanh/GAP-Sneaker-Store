const Order = require('./orderModel')

const getRevenueReport = async (timestamps) => {
    // Find the revenue in first day
    const startTime = new Date(timestamps[0]);
    console.log(startTime);
    const startOfDay = new Date(startTime.setHours(0, 0, 0, 0));
    const endOfDay = new Date(startTime.setHours(23, 59, 59, 999));
    const revenueOnFirstDate = await Order.find({ createdAt: { $gte: startOfDay, $lt: endOfDay } })
    let revenue = [];
    revenue.push(revenueOnFirstDate.reduce((total, order) => total + order.totalPay, 0));
    /// Find the revenue from first day the the end of each day since the first day
    for (let i = 1; i < timestamps.length; i++) {
        timestamps[i] = new Date(timestamps[i]);
        console.log(timestamps[i]);
        const allorders = await Order.find({ createdAt: { $gte: startOfDay, $lt: timestamps[i].setHours(23, 59, 59, 999) } })
        console.log(allorders);
        revenue.push(allorders.reduce((total, order) => total + order.totalPay, 0));
    }
    console.log(revenue)
    return revenue;
}

const getRevenueReportByProduct = async (timestamps) => {
    const startTime = new Date(timestamps[0]);
    const endTime = new Date(timestamps[timestamps.length - 1]);
    
    let revenue = {};
    
    /// Find the revenue from first day the the end of each day since the first day
    const allOrders = await Order.find({ createdAt: { $gte: startTime, $lte: endTime } }).populate('products.productId'); 

    allOrders.forEach(order => {
        revenue[order.products[0].productId.name] = revenue[order.products[0].productId.name] ? revenue[order.products[0].productId.name] + order.totalPay : order.totalPay;
    });
    
    
    return revenue;
}

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
    updateOrderStatus,
    getRevenueReport,
    getRevenueReportByProduct
}