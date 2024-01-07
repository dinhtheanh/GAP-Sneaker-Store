const mongoose =require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
const cartSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }

})
const userSchema = new mongoose.Schema({
    name: {type: String, require:true},
    phone: {type: String, require:true},
    email: {type:String, require:true,unique:true},
    address:{type:String,require:true},
    password: {type:String, require:true, minlength: 8},
    img: {type:String, require:true, default:"https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7ef88efc-01ff-427e-9def-b84d5a344053/paris-saint-germain-jumpman-mvp-shoes-LxppNW.png"},
    gender: {type:String, require:true},
    isAdmin :{type:Boolean,require:true,default:false},
    isBanned:{type:Boolean,require:true,default:false},
    acessToken:{type:String,require:true},
    refreshToken:{type:String,require:true},
    cart: [cartSchema],

    },
    {
        timestamps:true
    })
//userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
const User = mongoose.model('user',userSchema);
module.exports = User; 