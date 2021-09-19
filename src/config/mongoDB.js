const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, (error)=>{
    if(error){
        log.error(`MongoDB Connection Errors : ${error}`);
    } else{
        console.log("MongoDB Connection Success");
    }
})

