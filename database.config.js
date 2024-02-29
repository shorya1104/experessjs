const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(req=>{
    console.log("Database Connect Successfully");
})
.catch((err)=>console.log(err));