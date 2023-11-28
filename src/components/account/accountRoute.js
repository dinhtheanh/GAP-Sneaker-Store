const userController = require('./accountController.js')

const handleSignUp = (router) => {
    router.post('/sign-up', userController.createUser);
    router.get('/sign-up', (req, res) => {
        res.render("customer/navbar/signup", { layout: "customer/layout" });
    });
    return router;
}

const handleLogin = (router) => {
    router.post('/log-in', userController.loginUser);
    router.get('/log-in', (req, res) => {
        res.render("customer/navbar/login", { layout: "customer/layout" });
    });
    return router;
}

module.exports = {
    handleSignUp,
    handleLogin
}