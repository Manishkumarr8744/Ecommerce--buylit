const Order= require("../models/orderModel")
const Product= require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAyncError=require("../middlewares/catchAsyncError")


//create new order
exports.newOrder=catchAyncError(async(req,res,next)=>{
    try{
        const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body;
    console.log(req.body);
    

    const order=await  Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })

    res.status(200).json({
        success:true,
        message:"order created"
    })
    }catch(err){
        console.log("err is ",err);
        
    }
})

//get single order
exports.getSingleOrder=catchAyncError(async(req,res,next)=>{

    const order=await Order.findById(req.params.id).populate("user","name email")

    if(!order){
        return next(new ErrorHandler("Order not found with this is ID",400))
    }

    res.status(200).json({
        sucess:true,
        order
    })

})

//get logged in user order
exports.myOrders=catchAyncError(async(req,res,next)=>{

    const order=await Order.find({user:req.user._id})

    if(!order){
        return next(new ErrorHandler("Order not found in your ID",400))
    }

    res.status(200).json({
        success:true,
        order
    })

})

//get all orders
exports.getAllOrder=catchAyncError(async(req,res,next)=>{

    const orders=await Order.find();

    let totalAmount=0

    orders.forEach((order)=>{
        totalAmount+=order.totalPrice
    })


    res.status(200).json({
        sucess:true,
        totalAmount,
        orders
    })
})


//update order status (admin)
exports.updateOrderStatus = catchAyncError(async(req, res, next) => {
    // Debug: Check what we're receiving
    console.log("Request body:", req.body);
    console.log("Order ID:", req.params.id);
    
    const order = await Order.findById(req.params.id);
    
    // Debug: Check current order status
    console.log("Current order status BEFORE update:", order.orderStatus);
    console.log("New status from request:", req.body);

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }

    if (order.orderStatus === "delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400))
    }

    if(order.orderStatus==='delivered'){
        await Promise.all(
        order.orderItems.map(async (item) => {
            await updateStock(item.product, item.quantity)
        })
    )
    }

    // Debug: Before assignment
    console.log("About to assign:", req.body.status);
    order.orderStatus = req.body.status
    
    // Debug: After assignment
    console.log("Order status AFTER assignment:", order.orderStatus);
    console.log("Order modified fields:", order.modifiedPaths());

    if (req.body.orderStatus === "delivered") {
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false })
    
    // Debug: After save
    console.log("Order status AFTER save:", order.orderStatus);

    res.status(200).json({
        success: true,
        order
    })
})
async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    
    // Add validation
    if (!product) {
        throw new Error('Product not found')
    }
    
    product.stock = product.stock - quantity
    await product.save({ validateBeforeSave: false })
}
//delete order status (admin)
exports.deleteOrder=catchAyncError(async(req,res,next)=>{

    const order=await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found!!",400))
    }

    await order.deleteOne()

    res.status(200).json({
        sucess:true,
        
        
    })
})



