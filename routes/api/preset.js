const express = require("express");
const jwt = require("jsonwebtoken")
const Paitient = require("../../models/paitient");
const mail = require("../../mail/resetpass");
const router = express.Router();

router.get("/",(req,res)=>{
  res.render("presetPass");
})

router.post("/",async (req,res)=>{
  try{

  let username = req.body.username;
  const emp = await Paitient.findOne({username : username});
  if(!emp){
    res.json({message : "No User found"});
    return;
  }
  let payload = {
    username : username,
    type : "pat"
  }
  const token = await jwt.sign(payload,"secret",{algorithm : "HS256"});
  await mail(emp.email , token);
  res.json({message : "Password reset link has been sent to your registered email address"});
}
catch(err){
  console.log(err);
}
})

module.exports = router;
