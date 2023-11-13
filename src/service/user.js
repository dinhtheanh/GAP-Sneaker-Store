const User = require("../models/user");

const createUser =()=>{
    return new Promise(async(resolve,reject)=>{
        const {name,email,password,comfirmPassword,phone} = newUser;
        try{
            const createdUser = await User.create({
                name,
                email,
                password,
                comfirmPassword,
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