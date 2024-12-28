const asyncHandler=require("express-async-handler");
const User= require("../models/user.model");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken")

//This is for creating an account
const createAccount=asyncHandler(async(req,res)=>{
    const {fullName, email, password}= req.body;
    if(!fullName || !email ||!password){
     return res.status(400).json({error:true, message:"All fields are required"});
    }
    const isUser= await User.findOne({email})
    if(isUser){
     return res.status(400).json({error:true, message:"User already exists"});
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const user = await User.create({
       fullName,
       email,
       password:hashedPassword,
    })
 
    await user.save();
 
    const accessToken=jwt.sign(
       {userId:user._id},
       process.env.ACCESS_TOKEN_SECRET,
       {expiresIn:"1h"}
    )
    return res.status(201).json({
       error:false,
       user:{fullName:user.fullName,email:user.email},
       accessToken,
       message:"Registration is suscessful"
    })
})

//This is for log in an account
const loginUser=asyncHandler(async(req,res)=>{
   const{email,password}=req.body;
   //If email or pass not provided
   if(!email || !password){
      res.status(400).json({message:"Email or password is required!"})
   }
   const user=await User.findOne({email});
   const isPassValid=await bcrypt.compare(password,user.password);
   //If pass and email are both invalid or valid
   if(user && isPassValid){
      //If both valid, the user._id is assigned to token payload
      const accessToken =jwt.sign(
         //payload
         {userID:user._id},
         //secret key
         process.env.ACCESS_TOKEN_SECRET,
         {expiresIn:"1h"}
      )
      res.status(200).json({message:"Log in successful", accessToken})
      //If either invalid
   } else{
      res.status(400).json({message:"Email or password is incorrect!"})
   }
})

//Get user
const getUser=asyncHandler(async(req,res)=>{
   const userId= req.user.userID;
   const user= await User.findById(userId);
   res.status(200).json(user);
})

module.exports = {createAccount,loginUser,getUser};