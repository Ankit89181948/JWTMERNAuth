const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log("Error in connecting database",err);
})