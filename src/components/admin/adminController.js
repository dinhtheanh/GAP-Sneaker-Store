const accountService = require('../account/accountService');
const productService = require('../product/productService');
const getCustomerListPage = async (req, res) => {
    const data = await accountService.getAllUsers();
    console.log(data);
    res.render("admin/customerstable", {layout: "admin/layout", users: data['users']});
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
    console.log(req.user);
    res.render("admin/accountsettings", {layout: "admin/layout", user: req.user});
}

const getOrderPage = (req, res) => {
    res.render("admin/orders", {layout: "admin/layout"});
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
    getProductDetailsPage
}