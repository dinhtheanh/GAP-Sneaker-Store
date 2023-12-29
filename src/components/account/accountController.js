const async = require('hbs/lib/async')
const userSevice = require('./accountService.js')
const passport = require('./passport-config');

// Authenticating functions
const createUser = async (req, res) => {
    
    try {
        const { name, email, password, cfpassword, phone, address } = req.body
        console.log(req.body);

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const isValidEmail = reg.test(email)

        if (!name || !email || !password || !cfpassword || !phone || !address) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        else if (!isValidEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Not a valid email-address'
            })
        }
        else if (password !== cfpassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Please enter valid comfirm password'
            })
        }
        //console.log(req.body);
        //console.log("Hello");
        const response = await userSevice.createUser(req.body)

        res.redirect('/home');
    }
    catch (err) {
        return res.status(404).json({
            message: err
        })

    }
}

const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // Xử lý trường hợp đăng nhập không thành công
            return res.redirect('/log-in');
        }

        // Đăng nhập thành công, lưu trạng thái người dùng vào session
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            // Lấy địa chỉ trang trước đó từ session hoặc chuyển hướng mặc định
            const returnTo = req.session.returnTo || '/home';
            
            // Xóa trường returnTo từ session
            delete req.session.returnTo;

            // Chuyển hướng người dùng về địa chỉ đã lưu
            return res.redirect(returnTo);
        });
    })(req, res, next);
};
const logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return next(err);
        }
        req.session.destroy((err) => {
            res.redirect('/home');
        });
    });
};

// // Geting users
// const getAllUsers = async (req, res) => {
//     try {
//         const response = await userSevice.getAllUsers()
//         res.status(200).json({
//             data: response
//         })
//     }
//     catch (err) {
//         res.status(404).json({
//             message: err
//         })
//     }
// }

module.exports = {
    createUser,
    loginUser,
    logoutUser
}