const User = require("./accountModel.js");
const bcrypt = require("bcrypt");

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


const getUserById = async (id) => {
  const userFound = await User.findById(id);
  console.log(userFound);
  return userFound;
}

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  findUser,
  getUserById
};
