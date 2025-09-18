const mongoose= require("mongoose")

const validator= require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")

const userSchema=new  mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength:[30,"Name cannot exceed 30 chaarcter"],
        minLength:[4,"Name should be greater than 4 character"]
    },
    email:{
        type:String,
        required:[true,"please enter your Email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email"]
    },
    password:{    
        type:String,
        required:[true,"please enter your password"],
        minLength:[6,"Name should be greater than 6 character"],
        select:false
    },
    
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date

})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }

    this.password=await bcrypt.hash(this.password,10)
})

//JWT TOEKn
userSchema.methods.getJWTToken=function(){
    return jwt.sign({
        id:this._id,
    },        process.env.JWT_SECRET,
    {
        expiresIn:process.env.JWT_EXPIRE
    }
)
}

//comparePAssword
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//reset password
userSchema.methods.getResetPasswordToken=function(){

    //generating token
    const resetToken= crypto.randomBytes(20).toString("hex");

    //hashing and add resetpassword to userschema
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire=Date.now()+15*60*1000

    return resetToken;
}


module.exports=mongoose.model("User",userSchema)