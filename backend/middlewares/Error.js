const ErrorHandler =require("../utils/errorHandler")

module.exports=(err,req,res,next)=>{
    err.statusCode= err.statusCode ;
    err.message=err.message ;


    //worng databse error
    if(err.name=="TypeError"){
        const message=`Resource not found. Invalid: ${err.path}`
         new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        statusCode:err.statusCode,
        message:err.message
    })

}