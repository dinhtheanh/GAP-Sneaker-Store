const getCustomerListPage = (req, res) => {
    //let products = await Services.getAllProducts();
    //console.log(products);
    res.render("admin/customerstable", {layout: "admin/layout"});
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

const getSignupPage = (req, res) => {
    res.render("admin/signup");
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
    getSignupPage
}