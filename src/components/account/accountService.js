const User = require("./accountModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
require('dotenv/config');
const sendPasswordEmail = async (recipientEmail) => {
    // Create a nodemailer transporter
    const emailUsername = process.env.EMAIL_USERNAME;
    const emailPassword = process.env.EMAIL_PASSWORD; // your email password or application-specific password
    const defaultPassword = process.env.DEFAULT_PASSWORD;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587 ,
        secure: false,
        auth: {
          user: emailUsername, // your Gmail address
          pass: emailPassword, // the app-specific password generated for your app
        },
      });
  
    // Email content
    const mailOptions = {
      from: emailUsername,
      to: recipientEmail,
      subject: 'Your Default Password',
      text: `Your default password is: ${defaultPassword}`,
    };
  
    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      return { success: true, message: 'Your new password was sent successfully' };

    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  };
const resetPassword = async(email)=>{
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            // User not found
            return { success: false, message: 'User not found' };
          }
        
        
        
        // Trả về một giá trị hoặc thông báo nếu cần thiết
        const emailResult = await sendPasswordEmail(email);

        if (emailResult.success) {
            const hash = bcrypt.hashSync(process.env.DEFAULT_PASSWORD,10);
            user.password=hash;
            await user.save();
            console

          return { success: true, message: 'Your new password was sent to your email' };
        } else {
          // Handle the case where the email sending failed
          return { success: false, message: 'Error while sending email, pleae try again later' };
        }
    } catch (error) {
       console.log(error);
        throw new Error('Internal Server Error');
    }};


const changePassword = async(id,curps,newps)=>{
    try {
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

const findUser = (keyword, filter, sortby) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Determine the filter field
      let filterField;
      if (filter === 'Name') {
        filterField = 'name';
      } else if (filter == "Email") {
        // Add other filters as needed
        filterField = 'email';
      }

      // Determine the sort order
      let sortOrder;
      if (sortby === 'nameasc') {
        sortOrder = 'name';
      } else if (sortby === 'namedes') {
        sortOrder = '-name';
      } else if (sortby === 'mailasc') {
        sortOrder = 'email';
        // Add other sort orders as needed
      } else if (sortby === 'maildes') {
        sortOrder = '-email';
      } else if (sortby === 'timeasc') {
        sortOrder = 'createdAt';
      }
      else if (sortby === 'timedes') {
        sortOrder = '-createdAt';
      }
      // Build the query
      let query = {};
      query[filterField] = new RegExp(keyword, 'i');
      // Execute the query
      console.log(query)
      console.log(sortOrder)
      const users = await User.find(query).sort(sortOrder).exec();
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
}


const createUser = async (userData) => {
    try {
      const { name, email, password, cfpassword, phone, address,gender } = userData;

      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        return{
          status: "ERR",
          message: "The email is already used",
        };
      }

      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hash,
        phone,
        address,
        gender  
      });
      if (createdUser) {
        return{
          status: "OK",
          message: "Success to register account",
        };
      }
    } catch (err) {
      console.log(err);
      return {err};
    }
  
};

const changeAdminProfile = (id, name, email, phone, address) => {
  try {
    return User.findByIdAndUpdate({ _id: id}, {name: name, phone: phone, email: email,  address: address}, {new: true});

  } catch (error) {
    console.log(error);
    return false;
  }
}

const unbanUser = async (id) => {
  try {
    User.findByIdAndUpdate({ _id: id}, {isBanned: false}, {new: true}).then((result) => {
      if (result != null){
        return true;
      } else {
        return false;
      }
    });

  } catch (error) {
    console.log(error);
    return false;
  }
}

const banUser = async (id) => {
  try {
    User.findByIdAndUpdate({ _id: id}, {isBanned: true}, {new: true}).then((result) => {
      if (result != null){
        return true;
      } else {
        return false;
      }
    });

  } catch (error) {
    console.log(error);
    return false;
  }
}

const loginUser = (userData, done) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, cfpassword, phone, address } = userData;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      //console.log(checkUser)
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Can not find user email!",
        });
      }
      const passwordCompare = bcrypt.compareSync(password, checkUser.password);
      if (!passwordCompare) {
        resolve({
          status: "ERR",
          message: "Invalid password",
        });
      }

      resolve({
        status: "SUCCESS",
        checkUser,
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
        const users = await User.find({});
        //console.log(users);
        resolve({
            users
        });
        } catch (err) {
        console.log(err);
        reject(err);
        }
    });
    };


const getUserById = async (id) => {
  const userFound = await User.findById(id);
  return userFound;
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



module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  findUser,
  getUserById,
  banUser,
  unbanUser,
  changeAdminProfile,
  clearCart,
  resetPassword,
  changeProfile,
  changePassword
};

