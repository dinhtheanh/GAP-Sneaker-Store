const async = require('hbs/lib/async')
const userSevice = require('./accountService.js')
const passport = require('./passport-config'); 


const createUser = async (req,res)=>{
    console.log('Received POST request to /signup');
    console.log(req.body);
    try{
        const {name,email,password,cfpassword,phone,address} = req.body
        console.log(req.body);

        const  reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const isValidEmail = reg.test(email)

        if(!name||!email||!password||!cfpassword||!phone||!address)
        {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        else if(!isValidEmail){
            return res.status(200).json({
                status : 'ERR',
                message: 'Not a valid email-address'
            })
        }
        else if(password!==cfpassword)
        {
            return res.status(200).json({
                status : 'ERR',
                message: 'Please enter valid comfirm password'
            })
        }
        //console.log(req.body);
        //console.log("Hello");
        const response = await userSevice.createUser(req.body)
        
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(404).json({
            message :err
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
const loginUser = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/log-in',
        
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



module.exports ={
    createUser,
    loginUser,
    logoutUser
}