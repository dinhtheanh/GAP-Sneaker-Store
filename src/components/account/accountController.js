const async = require('hbs/lib/async')
const userSevice = require('./accountService.js')

//
// var jsonParser = bodyParser.json()
 
// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
const createUser = async (req,res)=>{
    try{
        // const formData = req.body;
        // console.log(formData.address)
        // res.send('Form submitted successfully!');

        const {name,email,password,cfpassword,phone,address} = req.body

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

        const response = await userSevice.createUser(req.body)
        
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(404).json({
            message :err
        })

    }
}
const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body
        const  reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const isValidEmail = reg.test(email)
        console.log(password)
        if(!email||!password)
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
       

        const response = await userSevice.loginUser(req.body)
        
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(404).json({
            message :err
        })

    }
}


module.exports ={
    createUser,
    loginUser
}