const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type :String,
        required : true,
        min:3,
        max:15,
        unique:true
    },
    email:{
        type :String,
        required : true,
        max:30,
        unique:true ,
    },
    password:{
        type :String,
        required : true,
        min:8,
    },
    isAvathar:{
        type:Boolean,
        default:false,
    },
    avathar:{
        type:String,
        default:"",
    }
});

module.exports = mongoose.model("user",userSchema);