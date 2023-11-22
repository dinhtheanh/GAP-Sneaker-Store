const mongoose =require('mongoose')
mongoose.connect('your_database_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: {type: String, require:true, unique:true},
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

const User = mongoose.model('User',userSchema);
const user =  User.findOne({ 'name': 'John Doe 12' });

module.exports = {User,
    user};