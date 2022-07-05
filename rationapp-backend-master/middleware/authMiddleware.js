const jwt = require("jsonwebtoken");

function requireAuth(req,res,next){
    const token = req.header("token");
    if(!token) return res.status(401).json({message:"Auth Error"});
    try{
        const decoded = jwt.verify(token,"randomString");
        req.user=decoded.user;
        next();
    }catch(e)
    {
      console.error(e);
      res.status(500).send({message:"Invalid Token"})
    }
  };

module.exports = requireAuth;



// module.exports = function requireAuth(req,res,next) {
    

    // const token = req.cookies.jwt;
    // // const verifyToken = jwt.verify(token, 'dnynu secret');
    // // const rootUser = await User.findOne({ _id: verifyToken._id})
    // if(token){
    //    jwt.verify(token, 'dnynu secret',(err, decodedToken)=>{
    //        if(err){
    //            console.log(err.message);
    //            return res.redirect('/login');
    //        }else{
    //            console.log(decodedToken);
    //         //    req.token = token;
    //         //    req.rootUser = rootUser;
    //         //    req.userID = rootUser._id;
    //            next();
    //        }
    //    })
    // }
    // else{
    //      return res.redirect('/login');        
    // }









    // try{
    //     const token = req.cookies.jwt;
    //     console.log(token);
    //     if(token)
    //     var verifyToken =  jwt.verify(token, 'dnynu secret', function(err, decodedToken){
    //         if (err) {console.log(err)} ;
           
    //         return decodedToken;
    //     });
    //     console.log(verifyToken);
    //     const rootUser = await User.findOne({ _id : verifyToken._id, "tokens.token":token });
        
    //     if(!rootUser){ throw new Error('User not found')};

    //     req.token = token ;
    //     req.rootUser = rootUser;
    //     req.userID = rootUser._id;

    //     next();

    // }catch(err){
    //     res.status(401).send("Unauthorised");
    //     console.log(err);
    // }