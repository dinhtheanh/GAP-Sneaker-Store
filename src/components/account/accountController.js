const async = require('hbs/lib/async')
const userService = require('./accountService.js')
const passport = require('./passport-config');

const resetPassword = async(req,res)=>{
    try {
        // Your logic for changing the password goes here

        // Example: Accessing form data from the request body
        const email = req.body.email;
        

        if(!email){

            return res.status(400).json({ error: 'Please enter your email' })
        }
        
        

        const result = await userService.resetPassword(email);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(400).json({ error: result.message }); // Assuming a 401 status for incorrect password
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, cfpassword, phone, address } = req.body
        

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
// const loginUser = async (req,res)=>{

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
const changePassword = async(req,res)=>{
    try {
        // Your logic for changing the password goes here

        // Example: Accessing form data from the request body
        const { email, password, newpassword, cfnewpassword } = req.body;
        

        if(!email||!password||!newpassword||!cfnewpassword){
            console.log('All fields are required');
            return res.status(400).json({ error: 'All fields are required' })
        }
        if(newpassword!=cfnewpassword)
        {
            return res.status(400).json({ error: 'Incorrect confirm for new password' })

        }
        if(newpassword===password)
        {
            return res.status(400).json({ error: 'New password must be different from the current password.' })

        }
        if(email!=req.user.email)
        {
            return res.status(400).json({ error: 'Invalid email address' })
        }
        

        const result = await userService.changePassword(req.user._id,password,newpassword);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(400).json({ error: result.message }); // Assuming a 401 status for incorrect password
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const changeProfile = async (req,res) =>{
    try {
        const newInfo = req.body;
        

        const avatar = req.file; 

        if (Object.keys(newInfo).length > 0 || avatar) {
            const response = await userService.changeProfile(newInfo, avatar, req.user._id);

            
            res.status(200).json({ success: true, message: 'Profile updated successfully', data: response });
        } else {
            
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



module.exports = {
    createUser,
    loginUser,
    logoutUser,
    changeProfile,
    changePassword,
    resetPassword
}