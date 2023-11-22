const User = require("../models/user");

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

const getUser= ()=>{
    return new Promise(async (resolve, reject) => {
        try {
            // Adjust this part based on how User.user is supposed to be set
            if (User.user) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS connect',
                    data: User.user
                });
            } else {
                resolve({
                    status: 'ERROR',
                    message: 'Can not find',
                    data: 'can not find'
                });
            }
        } catch (err) {
            reject(err);
        }
    });
};

module.exports ={
    createUser,
    getUser
}
