const { log } = require("console");
const Error = require("../middlewares/Error");
const catchAyncError=require("../middlewares/catchAsyncError")
const User=require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken= require("../utils/jwtToken")
const sendEmail= require("../utils/sendEmail.js")
const crypto=require("crypto")



//Register a User
exports.registerUser=catchAyncError(async(req,res,next)=>{

    try{
        const {name,email,password}=req.body;
    const user= await User.create({name,email,password,})

        sendToken(user,201,res)

    }catch(err){
        console.log(err);
        
    }
})

//login user

 exports.loginUser= catchAyncError(async(req,res,next)=>{
     
    const {email,password}= req.body;

    //checking if user has given password email both
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and passwrrd",400))
    }
    
    const user = await User.findOne({email},).select("+password")

    if(!user){
        console.log("invalid email or password");
        
        return next(new ErrorHandler("Invalid email or password",401))
    }
    

    const isPasswordMatched=await user.comparePassword(password);
    
    
    if(!isPasswordMatched){
                console.log("invalid password");

        return next(new ErrorHandler("Invalid  password",401))
    }

    sendToken(user,200,res)
 })

//logout user
exports.logout=catchAyncError(async(req,res,next)=>{


    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Loggod out"
    })
})

//forget password
exports.forgotPassword= catchAyncError(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email})
    if(!user){
        return next(new ErrorHandler("User not found",404))
    }

   //get resetpassword token
   const resetToken= user.getResetPasswordToken()

   await user.save({validateBeforeSave:false})


   const resetPasswordUrl=`${req.protocol}://${req.get("host")}password/reset/${resetToken}`

   const message=`Your password reset and Token no is :-\n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`
   
   try{

    await sendEmail({
        email:user.email,
        subject:`Ecommerce password Recovery`,
        message

    })

    res.status(200).json({
        success:true,
        message:`email send to ${user.email} sucessfully`
    })

   }catch(error){
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save({validateBeforeSave:false})
    return next(new ErrorHandler(error.message,500))

   }
})

//resetpassword
exports.resetPassword= catchAyncError(async(req,res,next)=>{

    //creating hash token
        const resetPasswordToken =crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })

    if(!user){
        return next(new ErrorHandler("reset password token is invalid or has been expired ",404))
    }

    if(req.body.password!==req.bodyconfirmPassword){
          return next(new ErrorHandler("Password do not match ",404))
 
    }

    user.password=req.body.password;
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined
    
await user.save()

sendToken(user,200,res)

})

//get user details
exports.getUserDetails=catchAyncError(async(req,res)=>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
})

//update user password
exports.updateUserPassword=catchAyncError(async(req,res,next)=>{

    try{const user = await User.findById(req.user.id).select('+password')
    

    const isPasswordMatched=await user.comparePassword(req.body.oldPassword)
    
    

    if(!isPasswordMatched){
        return next(new ErrorHandler("old  password is incorrect",400))
    }
    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("password not matched",401))
    }

    user.password=req.body.newPassword;
    
    try{
        console.log(user);
        
     await user.save();
     sendToken(user, 200, res);
     
    }catch(err){
        console.log("password update error");
    }}catch(err){
        console.log(err);
        
    }
   
})

//update user profile
exports.updateUserProfile=catchAyncError(async(req,res,next)=>{
   const newUserData={
    name:req.body.name,
    email:req.body.email,
   }
   
   const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
   })

    res.status(200).json({
        success:true,
        user
    })
    
})

//get all user 
exports.getAllUser=catchAyncError(async(req,res,next)=>{

    const users =await User.find()

    res.status(200).json({
        success:true,
        users
    })

})

//get single user details (ADMIN)
exports.getSingleUser=catchAyncError(async(req,res,next)=>{

    const user =await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user
    })

})

//update user Role(admin)
exports.updateUserRole=catchAyncError(async(req,res,next)=>{

   const newUserData={
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
   }


   const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
   })

   await user.save()


    res.status(200).json({
        success:true,
        
    })
    
})

//delete user profile(admin)
exports.deleteUserProfile=catchAyncError(async(req,res,next)=>{

   const user = await User.findById(req.params.id)

   //we will remove cloudinary later

   if(!user){
    return next(new ErrorHandler(`user not exits with ID :${req.params.id}`))
   }

   await user.deleteOne()
   

    res.status(200).json({
        success:true,
        message:"user deleted succesfully"
    })
    
})



