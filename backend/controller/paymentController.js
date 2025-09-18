

const dotenv= require("dotenv")
dotenv.config({path:"config/config.env"})

const catchAsyncError =require("../middlewares/catchAsyncError")

const Stripe=require("stripe")

const stripe=Stripe(process.env.STRIPE_SECRET_KEY)

exports.processPayment=catchAsyncError(async(req,res,next)=>{
    const myPayment= await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"BuyLit"
        }
        
    })
    res.status(200).json({sucess:true ,client_secret:myPayment.client_secret})
})

exports.sendStripeAPIkey=catchAsyncError(async(req,res,next)=>{
    res.status(200).json({
        stripeApiKey:process.env.STRIPE_API_KEY
    })
})
