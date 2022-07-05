const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        lowercase : true,
    },
    lastname : {
        type : String,
        required : true,
        lowercase : true, 
    },
    mobileno : {
        type : String,
        required : true,
        minlength : 10,
        maxlength : 10,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        validate: [ isEmail , 'Please enter a valid email']
    },
    username : {
        type : String,
        required : true,
        minlength : 5,
        unique : true,
        lowercase : true
    },
    dob : {
        type : Date,
        required : true,
    },
    gender : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    }
});


//static method to login
adminSchema.statics.login = async (req, res)=>{
    let {email,password}=req.body;

   try{
     let user=await Admin.findOne({
       email
     });
     if(!user)
     {
       return res.status(400).json({
         message:"User not exists"
       });
     }

     const isMatch = await bcrypt.compare(password,user.password);
     if(!isMatch)
     {
       return res.status(400).json({
         message:"Incorrect Password"
       });
     }

     const payload={
       user:{
         id:user.id,
         name:user.username,
         email:user.email
       }
     };

     jwt.sign(
       payload,"randomString",
       {
         expiresIn:3600
       },
       (err,token)=>{
         if(err) throw err;
         res.status(200).json({
           token
         });
       }
     )
   }
   catch(err){
     console.error(err);
     res.status(500).json(
       {
         message:"Server error"
       }
     );
   }
}



// const maxAge = 3*60*60*24;
// userSchema.methods.generateAuthToken = async function(id) {
//     try{
//         let token = jwt.sign({ _id: this._id }, 'dnynu secret',{
//             expiresIn : maxAge
//         });
//         this.tokens = this.tokens.concat({token});
//         await this.save();
//         return token;
//     }catch(err){
//         console.log(err);
//     }
// }


const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;