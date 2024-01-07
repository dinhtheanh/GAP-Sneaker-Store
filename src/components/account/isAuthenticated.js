const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // Nếu đã đăng nhập, tiếp tục xử lý
        return next();
    }
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    res.redirect('/log-in');
};


module.exports = isAuthenticated;