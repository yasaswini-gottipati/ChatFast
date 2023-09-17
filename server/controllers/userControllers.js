const user =require("../models/userModel");
const brcypt=require("bcrypt");

module.exports.register = async(req,res,next) =>{

   try{
    const {username,email,password}=req.body;
   const checkuser= await user.findOne({username});
   if(checkuser){
    return res.json({msg :"Username already taken!!",status:false});
   }
   const checkemail= await user.findOne({email});
   if(checkemail){
    return res.json({msg :"Account with this email is already exist!!",status:false});
   }
   const hashpassword = await brcypt.hash(password,10);
   const users =await user.create({
    username,
    email,
    password:hashpassword,
   });
   users.save();
   return res.json({status:true,users});
   }
   catch(e){
    next(e);
   }
};

module.exports.login = async(req,res,next) =>{

    try{
     const {username,password}=req.body;
    const User= await user.findOne({username});
    if(!User){
     return res.json({msg :"Incorrect Username!!",status:false});
    }
    const isPassword = await brcypt.compare(password,User.password)
    if(!isPassword){
        return res.json({msg :"Incorrect Password!!",status:false});
    }
    User.save();
    return res.json({status:true,User});
    }
    catch(e){  
     next(e);
    }
 };
 module.exports.setAvathar =async(req,res,next) =>{
   try{
     const userId=req.params.id;
     console.log(userId);
     const avaimg=req.body.image;
     console.log(avaimg);
     const userData=await user.findByIdAndUpdate(userId,
     { isAvathar:true,
      avathar:avaimg
     });
     userData.save();
     return res.json({isSet:userData.isAvathar,image:userData.avathar})
   }
   catch(e){
      next(e);
   }
 }

 module.exports.getAllUsers= async(req,res,next)=>{
  try{
     const usep = await user.find({_id: { $ne: req.params.id}}).select([
        "email",
        "username",
        "avathar",
        "_id",
     ])
     return res.json(usep);
  }
  catch(e){
    next(e);
  }
 };