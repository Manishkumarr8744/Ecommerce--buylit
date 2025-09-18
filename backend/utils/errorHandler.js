class ErrorHandler extends Error{

    constructor(message,statusCode){
        super(message)
        this.statuseCode=statusCode

        Error.captureStackTrace(this , this.constructor)
    }
}

module.exports= ErrorHandler