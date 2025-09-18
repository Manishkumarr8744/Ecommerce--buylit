const app = require("./app")
const dotenv= require("dotenv")
const connectDB = require("./config/database")


//handlinf uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    process.exit(1)
})

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
dotenv.config({path:"config/config.env"})
}


//connect Database
connectDB()

const server=app.listen(process.env.PORT,()=>{
    console.log(`server is started on http://localhost:${process.env.PORT}`);
})

//unhandled prmoise Rejection
process.on("unhandledRejection",err=>{
    console.log(`error: ${err.message}`);
    console.log(`shutting down the server Due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1)
    })
})