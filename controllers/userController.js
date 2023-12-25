const User = require ('../models/userModel');

class UserController {


   async loginReder(req,res){
       try {
        res.render('login')
        
       } catch (error) {
        console.error('something wrong in usercontroller',error);
        throw(error)
       } 
   }
   async registerRender(req,res){
     try {
        res.render('register')
     } catch (error) {
        console.error('something wrong in usercontroller',error);
         throw(error)
     }
   }

   async login(req,res){
      try {
         const response = await User.findOne({username:req.body.username});
         const uid = response._id;

         if(response.password == req.body.password){
            const allUsers = await User.find({_id:{$nin:[response._id]}})
            res.render('chatPannel',{users:allUsers,uid,username:req.body.username})
         } else {
            res.redirect('./login')
         }
        
      } catch (error) {
         console.error('something wrong in usercontroller',error);
         throw(error)

      }
   }

   async register(req,res){
     try {
        const username = req.body.username;
        const response = await User.find({username}).countDocuments()

        if(response===1){
            res.redirect('/login')
        }
        else {
            const newUser = {
                username,
                password:req.body.password,
                email:req.body.email
            }
            const response = await User.create(newUser);
            const allUsers = await User.find({_id:{$nin:[response._id]}})
          
           res.render('chatPannel',{users:allUsers,uid:response._id,username:req.body.username})
        }


     } catch (error) {
        console.error('something wrong in usercontroller',error);
        throw(error)
     }
   }
}
module.exports = UserController