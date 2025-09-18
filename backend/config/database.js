const mongoose= require("mongoose")

const connectDB=()=>{
    mongoose.connect(process.env.DB_URI).then((data)=>{
console.log(`MongoDB connect with server ${data.connection.host}`);

}).catch((err)=>{
    console.log(`error in  db  ${err}`);
    
})
}

module.exports=connectDB