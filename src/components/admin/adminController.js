const accountService = require('../account/accountService');
const productService = require('../product/productService');
const orderService = require('../order/orderService');
const changeAdminPermission = async (req, res) => {
    const data = req.body;
    const result = await accountService.changeAdminPermission(data.id, data.isAdmin);
    if (result) {
        res.status(200).send({ result: 'success', message: 'Admin permission of this user changed' });
    } else {
        res.status(500).send({ result: 'error', message: 'Internal server error' });
    }
}

const getCustomerListPage = async (req, res) => {
    const data = await accountService.getAllUsers();
    console.log(data);
    res.render("admin/customerstable", {layout: "admin/layout", users: data['users']});
}

const updateOrderStatus = async (req, res) => {
    const { id, status } = req.body;
    const result = await orderService.updateOrderStatus(id, status);
    if (result) {
        res.status(200).send({ result: 'success', message: 'Order status updated' });
    } else {
        res.status(500).send({ result: 'error', message: 'Internal server error' });
    }
}

const getOrderDetailsPage = async (req, res) => {
    const data = await orderService.getOrdersByOrderId(req.params.id);
    console.log(data)
    res.render("admin/orderdetail", {layout: "admin/layout", order: data[0]});
}

const getProductDetailsPage = async (req, res) => {
    const data = await productService.getProductDetail(req.params.id);
    res.render("admin/productdetail", {layout: "admin/layout", product: data});
}

const getHomePage = (req, res) => {
    res.render("admin/layout");
}

const getLoginPage = (req, res) => {
    res.render("admin/login");
}

const getAccountSettingsPage = (req, res) => {
    //console.log(req.user);
    res.render("admin/accountsettings", {layout: "admin/layout", user: req.user});
}

const getOrderPage = async (req, res) => {
    const allOrders = await orderService.getAllOrders();
    //console.log(allOrders);
    res.render("admin/orders", {layout: "admin/layout", orders: allOrders});
}

const getProductListPage = (req, res) => {
    
    res.render("admin/productlist", {layout: "admin/layout"});
}

const getAddProductPage = (req, res) => {
    res.render("admin/addProductForm", {layout: "admin/layout"});
}

const banUser = async (req, res) => {
    if (req.params.id == req.user._id) {
        res.status(200).send({ result: 'error', message: 'You cannot ban yourself' });
    } else {
    const user = await accountService.getUserById(req.params.id);
    if (user.isBanned) {
        res.status(200).send({ result: 'error', message: 'User has been banned already' });
    } else {
        const result = accountService.banUser(req.params.id);
        if (result) {
        res.status(200).send({ result: 'success', message: 'User banned' });
        } else {
        res.status(500).send({ result: 'error', message: 'Internal server error' });
        }
    }
}
}

const unbanUser = async (req, res) => {
    const user = await accountService.getUserById(req.params.id);
    if (!user.isBanned) {
        res.status(200).send({ result: 'error', message: 'User has not been banned' });
    } else {
    const result = accountService.unbanUser(req.params.id);
    if (result) {
        res.status(200).send({ result: 'success', message: 'User unbanned' });
    } else {
        res.status(500).send({ result: 'error', message: 'Internal server error' });
    }
}
}

const getDashboardPage = (req, res) => {
    res.render("admin/dashboard", {layout: "admin/layout"});
}

const getMaintenancePage = (req, res) => {
    res.render("admin/maintenance");
}

const searchCustomer = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const filter = req.query.filter;
        const sort = req.query.sort;
        const limit = parseInt(req.query.limit) || 2;
        const page = parseInt(req.query.page)  || 1;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};
       
        //console.log(payload);
        const result = await accountService.findUser(keyword, filter, sort);
        if (endIndex < result.length) {
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

        const totalPages = Math.ceil(result.length / limit);
        
        

        results.current = result.slice(startIndex, endIndex);

        console.log(results.current);
        res.status(200).send({ result: results.current, pages: totalPages, currentPage: page});
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: 'error', message: 'Internal server error' });
    }
}

const searchProduct = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const cateFilter = req.query.cateFilter;
        const manuFilter = req.query.manuFilter;
        const sort = req.query.sort;
        const limit = parseInt(req.query.limit) || 2;
        const page = parseInt(req.query.page)  || 1;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};
       

        //console.log(payload);
        //const result = await accountService.findUser(keyword, filter, sort);
        
        const result = await productService.findProduct(keyword, cateFilter, manuFilter, sort);
        if (endIndex < result.length) {
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

        const totalPages = Math.ceil(result.length / limit);
        results.current = result.slice(startIndex, endIndex);

        console.log(results.current);
        res.status(200).send({ result: results.current, pages: totalPages, currentPage: page});
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: 'error', message: 'Internal server error' });
    }
}

const getCustomerDetailsPage = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await accountService.getUserById(id);
        res.render("admin/customerdetail", {layout: "admin/layout", user: result});
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: 'error', message: 'Internal server error' });
    }

}

const changeAdminProfile = async (req, res) => {
    try {
        //console.log("hello");
        console.log("request params",req.params);
        console.log("request body",req.body);
        const { id, name, email, phoneNumber, address } = req.body;
        let result = await accountService.changeAdminProfile(id, name, email, phoneNumber, address);
        
        console.log("result is", result);
        if (result) {
            res.status(200).send({ result: 'success', message: 'Profile changed' });
        } else {
            
            res.status(500).send({ result: 'error', message: 'Internal server error' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: 'error', message: 'Internal server error' });
}
}

const updateProduct = async (req, res) => {
    try {
        const { id, name, stock, price, category, manufacturer} = req.body;
        const result = await productService.updateProduct(id, name, price, stock, category, manufacturer);
        if (result) {
            res.status(200).send({ result: 'success', message: 'Product updated' });
        } else {
            res.status(500).send({ result: 'error', message: 'Internal server error' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: 'error', message: 'Internal server error' });
    }
}

const uploadImageProduct = async (req, res) => {
    try {
        const { id, img } = req.body;
        let result = await productService.addProductImage(id, img);
        if (result) {
            console.log(result);
            res.status(200).send({ result: 'success', message: 'Product image added' });
        } else {
            res.status(500).send({ result: 'error', message: 'Internal server error' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: 'error', message: 'Internal server error' });
    }
}

const deleteProductImage = async (req, res) => {
    try {
        const { id, img } = req.body;
        let result = await productService.deleteProductImage(id, img);
        if (result) {
            console.log(result);
            res.status(200).send({ result: 'success', message: 'Product image deleted' });
        } else {
            res.status(500).send({ result: 'error', message: 'Internal server error' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: 'error', message: 'Internal server error' });
    }
}

const sortAndFilterOrder = async (req, res) => {
    try {
        const filterParam = req.query.filter;
        const sortParam = req.query.sort;
        let sort, filter;
        if (sortParam == 'timeasc') {
            sort = 'createdAt';
        } else if (sortParam == 'timedes') {
            sort = '-createdAt';
        }

        if (filterParam == 'preparing') {
            filter = 'Preparing';
        } else if (filterParam == 'delivering') {
            filter = 'Delivering';
        } else if (filterParam == 'success') {
            filter = 'Successfully Delivered';
        } else if (filterParam == 'delay') {
            filter = 'Delayed';
        } else if (filterParam == 'cancel') {
            filter = 'Cancelled';
        }
            

        const limit = parseInt(req.query.limit) || 3;
        const page = parseInt(req.query.page)  || 1;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};
       
        //console.log(payload);
        const result = await orderService.findOrderByStatus(filter, sort);
        if (endIndex < result.length) {
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

        const totalPages = Math.ceil(result.length / limit);
        
        

        results.current = result.slice(startIndex, endIndex);

        console.log(results.current);
        res.status(200).send({ result: results.current, pages: totalPages, currentPage: page});
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: 'error', message: 'Internal server error' });
    }
}

const getRevenueReport = async (req, res) => {
    try {
        const timestamps = req.body.timestamps;
        const result = await orderService.getRevenueReport(timestamps);
        res.status(200).send({ result: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: 'error', message: 'Internal server error' });
    }
}

const getRevenueReportByProduct = async (req, res) => {
    try {
        const timestamps = req.body.timestamps;
        const result = await orderService.getRevenueReportByProduct(timestamps);
        res.status(200).send({ result: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: 'error', message: 'Internal server error' });
    }
}

const changePassword = async (req, res) => {
    try {
        const { id, oldPassword, newPassword } = req.body;
        const result = await accountService.changePassword(id, oldPassword, newPassword);
        if (result) {
            res.status(200).send({ result: 'success', message: 'Password changed' });
        } else {
            res.status(500).send({ result: 'error', message: 'Internal server error' });
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getCustomerListPage,
    getHomePage,
    getAccountSettingsPage,
    getOrderPage,
    getProductListPage,
    getAddProductPage,
    getMaintenancePage,
    getLoginPage,
    searchCustomer,
    getCustomerDetailsPage,
    searchProduct,
    banUser,
    unbanUser,
    getProductDetailsPage,
    changeAdminProfile,
    updateProduct,
    uploadImageProduct,
    deleteProductImage,
    getOrderDetailsPage,
    sortAndFilterOrder,
    updateOrderStatus,
    getDashboardPage,
    getRevenueReport,
    getRevenueReportByProduct,
    changePassword,
    changeAdminPermission
}