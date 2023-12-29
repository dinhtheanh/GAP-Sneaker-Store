const User = require("./accountModel.js");
const bcrypt = require("bcrypt");

const createUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, cfpassword, phone, address } = userData;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "ERR",
          message: "The email is already used",
        });
      }

      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hash,
        phone,
        address,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdUser,
        });
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};


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


module.exports = {
  createUser,
  loginUser,
  getAllUsers
};
