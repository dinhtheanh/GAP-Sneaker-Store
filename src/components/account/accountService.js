const User = require("./accountModel.js");

const createUser =()=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const createdUser = await User.User.create({
                name,
                email,
                password,
                confirmPassword,
                phone,
                username

            })
            if(createdUser)
            {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
            resolve({})
        }
        catch(err)
        {
            reject(err)
        }
    })
}

module.exports ={
    createUser
}