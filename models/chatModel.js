const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    content:{
         type:String,
         required:true
    },
    sender:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    reciver:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Chat = mongoose.model('Chat',chatSchema);
module.exports = Chat