const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    role:{
        type: String,
        default: 'student',
        enum: ['student','teacher','admin'],   
    }
});

module.exports =  mongoose.model("User",userSchema);