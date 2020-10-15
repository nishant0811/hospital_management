const jwt = require("jsonwebtoken");

module.exports =async  function(req,res,next){
  const token = req.cookies.token;
  if(!token){
    req.auth = "Not allowed";
    next();
  }
  else{
    try{
      const decode = await jwt.verify(token, "mysecretKEY" , {algorithm : 'HS256'})
      req.dataa = decode;
      req.auth = "allowed"
      next();
    }
    catch(e){
      console.log(e.message);
      req.auth = "Not allowed";
      next();
    }

  }
}
