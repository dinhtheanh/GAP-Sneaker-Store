const async = require('hbs/lib/async')
const userService = require('./accountService.js')
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
        const response = await userService.createUser(req.body)

        res.redirect('/home');
    }
    catch (err) {
        return res.status(404).json({
            message: err
        })

    }
}

// const loginUser = (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             // Xử lý trường hợp đăng nhập không thành công
//             return res.redirect('/log-in');
//     try{
//         const {email,password} = req.body
//         const  reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//         const isValidEmail = reg.test(email)
//         console.log(password)
//         if(!email||!password)
//         {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The input is required'
//             })
//         }
//         else if(!isValidEmail){
//             return res.status(200).json({
//                 status : 'ERR',
//                 message: 'Not a valid email-address'
//             })
//         }


//         const response = await userSevice.loginUser(req.body)

//         return res.status(200).json(response)
//     }
//     catch(err){
//         return res.status(404).json({
//             message :err
//         })

//     }
// }
const changeProfile = async (req,res) =>{
    try {
        // Access form data using req.body (text fields) and req.file (uploaded file)
        const newInfo = req.body;
        if(!req.file)
        console.log('there is no file');

        const avatar = req.file; // Assuming you are using upload.single('avatar')

        if (Object.keys(newInfo).length > 0 || avatar) {
            const response = await userService.changeProfile(newInfo, avatar, req.user._id);

            // Trả về thông báo và dữ liệu khi cập nhật thành công
            res.status(200).json({ success: true, message: 'Profile updated successfully', data: response });
        } else {
            // Trả về thông báo nếu không có dữ liệu mới
            res.status(400).json({ success: false, message: 'No new data provided for update' });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });

    }
};
const loginUser = async (req, res, next) => {
       // Sử dụng middleware authenticate với chiến lược 'local'
       passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Xử lý lỗi nếu có
            return next(err);
        }

        if (!user) {
            // Xử lý trường hợp đăng nhập không thành công
            return res.redirect('/log-in'); // Chuyển hướng đến trang đăng nhập
        }

        // Đăng nhập thành công, sử dụng req.login để lưu trạng thái người dùng vào session
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            if (user.isAdmin == false) {
            // Lấy địa chỉ trang trước đó từ session hoặc chuyển hướng mặc định
            const returnTo = req.session.returnTo || '/home';

            // Xóa trường returnTo từ session
            delete req.session.returnTo;

            // Chuyển hướng người dùng về địa chỉ đã lưu
            return res.redirect(returnTo);
            }
            else {
                const returnTo = '/admin';
                
                return res.redirect(returnTo);
            }
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
    logoutUser,
    changeProfile
}