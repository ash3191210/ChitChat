const mongoose = require('mongoose');

const dbConnect = async(url)=>{
     try {
        const response =await mongoose.connect(url);
        console.log("successfully connected to db...")
        
     } catch (error) {
        console.error('something wrong in db connect');
        throw(error)
     }
}
module.exports = dbConnect