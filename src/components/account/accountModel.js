const mongoose =require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, require:true},
    phone: {type: String, require:true},
    email: {type:String, require:true,unique:true},
    address:{type:String,require:true},
    password: {type:String, require:true, minlength: 8},
    isAdmin :{type:Boolean,require:true,default:false},
    acessToken:{type:String,require:true},
    refreshToken:{type:String,require:true},
    },
    {
        timestamps:true
    })
    
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('user',userSchema);
module.exports = User; 