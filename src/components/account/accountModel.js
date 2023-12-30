const mongoose =require('mongoose')
//const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, require:true},
    phone: {type: String, require:true},
    email: {type:String, require:true,unique:true},
    address:{type:String,require:true},
    password: {type:String, require:true, minlength: 8},
    isAdmin :{type:Boolean,require:true,default:false},
    isBanned:{type:Boolean,require:true,default:false},
    },
    {
        timestamps:true
    })
//userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
const User = mongoose.model('user',userSchema);
module.exports = User; 