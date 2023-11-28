const User = require("./accountModel.js");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefressToken } = require("./jwtService.js");

const createUser =(userData)=>{
    return new Promise(async(resolve,reject)=>{
        const {name,email,password,cfpassword,phone,address} = userData
        try{

            const checkUser =  await  User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already used'
                })
            }

            const hash = bcrypt.hashSync(password,10)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone,
                address
            })
            if(createdUser)
            {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        }
        catch(err)
        {
            console.log(err)
            reject(err)
        }
    })
}
const loginUser =(userData,done)=>{
    return new Promise(async(resolve,reject)=>{
        const {name,email,password,cfpassword,phone,address} = userData
        try{

            const checkUser =  await  User.findOne({
                email: email
            })
            //console.log(checkUser)
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'Can not find user email!'
                })
            }
            const passwordCompare = bcrypt.compareSync(password,checkUser.password)
            if(!passwordCompare)
            {
                resolve({
                    status: 'ERR',
                    message: 'Invalid password'
                })
            }
            const access_token = await generalAccessToken(
                {
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })
            const refresh_token = await generalRefressToken(
                {
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

            resolve({
                status: "SUCCESS",
                checkUser
                
            })
        }
        catch(err)
        {
            console.log(err)
            reject(err)
        }
    })
}

module.exports ={
    createUser,
    loginUser
}