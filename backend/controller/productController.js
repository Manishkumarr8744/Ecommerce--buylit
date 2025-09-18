
const Error = require("../middlewares/Error");
const Product= require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAyncError=require("../middlewares/catchAsyncError")
const ApiFeatures =require("../utils/apiFeatures");
const catchAsyncError = require("../middlewares/catchAsyncError");
const cloudinary = require("../utils/cloudinary");



//Create Product --Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  try {
    const { name, price, description, category, stock, image } = req.body;

    console.log("Incoming body:", req.body);

    let images = [];

    // ✅ Normalize image(s) into an array
    if (typeof image === "string") {
      images.push(image);
    } else if (Array.isArray(image)) {
      images = image;
    }

    const imagesLinks = [];

    // ✅ Upload each image to Cloudinary
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    // ✅ Create product with images
    const product = await Product.create({
      name,
      price,
      description,
      category,
      stock,
      image: imagesLinks, // make sure your schema field is "images"
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log("Backend Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});





//get all products
exports.getAllProducts=catchAyncError(async(req,res)=>{

    const resultPerPage=8;
    const productCount=await Product.countDocuments();

    const apiFeature= new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
    const products = await apiFeature.query
    // const products= await Product.find()


    res.status(200).json({
        
        products,
        productCount,
        resultPerPage
        
    }
    )
})

//get all products[Admin]
exports.getAdminProducts=catchAyncError(async(req,res)=>{

    const products=await Product.find()


    res.status(200).json({
        products        
    }
    )
})

//update product --Admin
exports.updateProduct = catchAyncError(async (req, res, next) => {
  
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Update the product
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });

});

//delete product -admin

exports.deleteProduct = catchAyncError(async (req, res, next) => {
    try{
        
    console.log(req.params.id);
    
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found for deletion", 404));
  }

  // Delete images from Cloudinary first
  for (let i = 0; i < product.image.length; i++) {
    await cloudinary.uploader.destroy(product.image[i].public_id);
  }

  // Now remove product from DB
  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
    }catch(err){
        console.log("err in bckend ", err);
        
    }
});


//get products deatils
exports.getProductDetails=catchAyncError(async(req,res,next)=>{

    console.log(req.params.id);
    
     
    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product not found ",404))
    }

    res.status(200).json({
        sucess:true,
        product,
        
    })
})

//create new review and update
exports.createProductReview=catchAsyncError(async(req,res,next)=>{
    try{
        

    const {rating,comment,id}=req.body;
    console.log(rating,comment,id);
    

    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }

    const product= await Product.findById(id);

    const isReviewed= product.reviews.find(rev=>rev.user.toString()===req.user._id.toString())
    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString()===req.user._id.toString()){
            rev.rating=rating,
            rev.comment=comment
            }
        })
    }else{
        product.reviews.push(review)
        product.numOfReviews=product.reviews.length
    }

    let avg=0
   product.reviews.forEach((rev)=>{
    avg+=rev.rating
   })

   product.ratings=avg/product.reviews.length

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        message:"rating..."
    })
    }catch(err){
        console.log("error is " , err);
        
    }
})

//get all reviews of a product
exports.getProductReview=catchAsyncError(async(req,res,next)=>{
    const product= await Product.findById(req.query.id);
    console.log(product);
    

    if(!product){
        return next(new ErrorHandler("Product not found to view rating"),404)
    }

    res.status(200).json({
        sucess:true,
        reviews:product.reviews
    })
})

//delete review
exports.deleteProductReview=catchAsyncError(async (req,res,next)=>{
  console.log(req.query.productId,req.query.id);
  try{
        const product= await Product.findById(req.query.productId);
        console.log(product);
        

         if(!product){
         return next(new ErrorHandler("Product review not found to delete"),404)
        }

        const reviews=product.reviews.filter((rev)=>rev._id.toString()!== req.query.id.toString())

        let avg=0
       reviews.forEach((rev)=>{  avg+=rev.rating})

  const rating=avg/reviews.length

  const numOfReviews=reviews.length;

  await Product.findByIdAndUpdate(
  req.query.productId,
  {
    reviews: reviews,
    rating: rating,
    numOfReviews: numOfReviews,
  },
  {
    new: true,
    runValidators: true,
    useFindAndModify: false
  }
)
 

  res.status(200).json({
    success:true,
    message:  "review deleted"
    
  })
}catch(err){
  console.log(err);
  
}

})