const express = require("express");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const Emp = require("../../models/employee");
const P = require("../../models/paitient")
const verify = require("../../middleware/verify")
const router = express.Router();

router.get("/" ,verify, (req,res)=>{
  if(req.auth == "Not allowed")
    res.render("Login");
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
    name : user.Name,
    username : user.UserName,
    type : user.Type
  }
  const token = await jwt.sign(payload, "mysecretKEY", {algorithm : 'HS256'});
  res.cookie("token",token,{httpOnly : true});

  res.redirect("/login")
})

router.get("/s", async (req,res)=>{
  try{
    const salt = await bycrypt.genSalt(10); // Generation of salt for hashing
    let password = await bycrypt.hash('qwerty' , salt);
    await P.findOneAndUpdate({username : "nishu08"},{pass : password})
    res.send("Done")
  }
  catch(e){
    console.log(e.message);
  }

})


module.exports = router
