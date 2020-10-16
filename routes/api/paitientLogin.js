const express = require("express");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const P = require("../../models/paitient")
const verify = require("../../middleware/verify")
const router = express.Router();

router.get("/" ,verify, (req,res)=>{
  if(req.auth == "Not allowed")
    res.render("plogin");
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
      case 'patitent':
        res.redirect("/paitientDash")
    }
  }
})

router.post("/",async (req,res)=>{
  const user = await P.findOne({username : req.body.username});
  //console.log(user);
  if(!user){
    res.json({message : "Invalid Creds"})
    return;
  }
  const compared = await bycrypt.compare(req.body.password, user.pass);
  if(!compared){
    res.json({message : "Invalid Creds"})
    return;
  }
  const payload = {
    name : user.name,
    username : user.username,
    type : user.type
  }
  const token = await jwt.sign(payload, "mysecretKEY", {algorithm : 'HS256'});
  res.cookie("token",token,{httpOnly : true});

  res.redirect("/paitientlogin")
})

module.exports = router
