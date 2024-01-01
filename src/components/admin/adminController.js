const accountService = require('../account/accountService');

const getCustomerListPage = async (req, res) => {
    const data = await accountService.getAllUsers();
    console.log(data);
    res.render("admin/customerstable", {layout: "admin/layout", users: data['users']});
}

const getHomePage = (req, res) => {
    res.render("admin/layout");
}

const getLoginPage = (req, res) => {
    res.render("admin/login");
}

const getAccountSettingsPage = (req, res) => {
    res.render("admin/accountsettings", {layout: "admin/layout"});
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
    getCustomerDetailsPage
}