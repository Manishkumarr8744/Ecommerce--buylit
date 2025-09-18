const express= require("express")
const router= express.Router();

const {isAuthenticatedUser}=require("../middlewares/authenication");
const { processPayment, sendStripeAPIkey } = require("../controller/paymentController");

router.route("/payment/process").post(isAuthenticatedUser,processPayment)
router.route("/stripeapikey").get(isAuthenticatedUser,sendStripeAPIkey)

module.exports=router;