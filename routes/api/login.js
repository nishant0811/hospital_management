const express = require("express");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const Emp = require("../../models/employee");
const verify = require("../../middleware/verify")
const router = express.Router();

router.get("/" ,verify, (req,res)=>{
  if(req.auth == "Not allowed")
    res.render("login");
  else{
    switch(req.dataa.type){
      case 'doctor':
        res.redirect("/docDash");
        break;
      case 'wardboy':
        res.redirect("/wardDash");
        break;
      case 'admin':
        res.redirect("/adminDash");
        break;
      case 'receptionisht':
        res.redirect("/receptionDash");
        break;
    }
  }
})

router.post("/",async (req,res)=>{
  const user = await Emp.findOne({UserName : req.body.username});
  if(!user){
    res.json({message : "Invalid Creds"})
    return;
  }
  const compared = await bycrypt.compare(req.body.password, user.Pass);
  if(!compared){
    res.json({message : "Invalid Creds"})
    return;
  }
  const payload = {
    username : user.UserName,
    type : user.Type
  }
  const token = await jwt.sign(payload, "mysecretKEY", {algorithm : 'HS256'});
  res.cookie("token",token,{httpOnly : true});

  res.redirect("/adminDash")
})

router.get("/s", async (req,res)=>{
  try{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pc2hhbnQwODFxIiwidHlwZSI6ImRvY3RvciIsImlhdCI6MTYwMjc0NTYxN30.pfRIxPifVBOLICYSset4SausC6VTyCuK1jgrk5LM_F0"
    const decode = await jwt.verify(token, "mysecretKEY" , {algorithm : 'HS256'})
    console.log(decode);
  }
  catch(e){
    console.log(e.message);
  }

})


module.exports = router
