const User = require("./accountModel.js");
const bcrypt = require("bcrypt");
const changePassword = async(id,curps,newps)=>{
    try {
        console.log(id);
        const user = await User.findById(id);
        const passwordCompare = bcrypt.compareSync(curps,user.password);
        if(!passwordCompare)
        {
            return { success: false, message: 'Your password is incorect' };

        }
        const hash = bcrypt.hashSync(newps,10)
        user.password=hash;
        // Convert the buffer to a base64-encoded string
        
        await user.save();
        
        // Trả về một giá trị hoặc thông báo nếu cần thiết
        return { success: true, message: 'Password updated successfully' };
    } catch (error) {
       console.log(error);
        throw new Error('Internal Server Error');
    }};

const changeProfile = async (data,avatar,id)=>{
    try {
        const user = await User.findById(id);

        user.name = data.name ? data.name : user.name;
        user.address = data.address ? data.address : user.address;
        user.phone = data.phone ? data.phone : user.phone;
        user.gender = data.gender ? data.gender : user.gender;
        if (avatar) {
            const imgBuffer = avatar.buffer.toString('base64');
            const imgBase64 = `data:${avatar.mimetype};base64,${imgBuffer}`;
            user.img = imgBase64;
        }

        // Convert the buffer to a base64-encoded string
        
        await user.save();
        
        // Trả về một giá trị hoặc thông báo nếu cần thiết
        return { success: true, message: 'Profile updated successfully' };
    } catch (error) {
        console.error('Error updating profile:', error);
        throw new Error('Internal Server Error');}};

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

const clearCart=async  (userId) =>{
    try {
        // Find the user by ID
        const user = await User.findById(userId);
        

        // Assuming your user model has a 'cart' property
        user.cart = [];

        // Save the updated user with an empty cart
        await user.save();

        
        return true; // Indicate success
    } catch (error) {
        console.log(error);
        return false; // Indicate failure
    }

};
module.exports ={
    createUser,
    loginUser,
    clearCart,
    changeProfile,
    changePassword
}