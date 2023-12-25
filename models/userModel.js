const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
         type:String,
         required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    image:{
        type:String,
        default:"https://qph.cf2.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd"
    },
    isOnline:{
        type:Boolean,
        default:false
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User

