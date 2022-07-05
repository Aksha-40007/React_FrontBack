require("dotenv").config();
const nodemailer = require("nodemailer");
// const hbs = require('nodemailer-express-handlebars');


let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        user :process.env.EMAIL,
        pass :process.env.PASSWORD
    }
});


const sendMail = (email, subject, text)=>{
    let mailOptions = {
        from : "nikibhole64@gmail.com",
        to : email,
        subject,
        html :text,
        // template:'rationUserAddEmailTemplate'
    }
    
    transporter.sendMail(mailOptions, function(err,info){
        if(err){
            console.log("error",err);
        }else{
            console.log("email sent");
        }
    });
}

module.exports = sendMail;
