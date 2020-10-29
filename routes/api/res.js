const express = require("express");
const jwt = require("jsonwebtoken")
const Emp = require("../../models/employee");
const Paitient = require ("../../models/paitient");
const bycrypt = require("bcryptjs");
const router = express.Router();

router.get("/:id",async (req,res)=>{
  const token = req.params.id;
  try{
  const data = await jwt.verify(token,"secret",{algorithm : "HS256"});
  if(data.type == "empp"){
    res.render("efinal", {token : token});
  }
  else{
    res.render("pfinal",{token : token});
  }
  }
  catch(e){
    console.log(e.message);
    res.json({message : e.message});
  }

})

router.post("/ereset",async (req,res)=>{
  const {password , token } = req.body;
  try{

  const data = await jwt.verify(token,"secret",{algorithm : "HS256"});
  const salt = await bycrypt.genSalt(10);
  const pass = await bycrypt.hash(password, salt);
  await Emp.findOneAndUpdate({UserName : data.username},{Pass : pass});
  res.redirect("/login");
}
catch(e){
  console.log(e.message);
  res.json({message : e.message});
}
})

router.post("/preset",async (req,res)=>{
  const {password , token } = req.body;
  try{

  const data = await jwt.verify(token,"secret",{algorithm : "HS256"});
  const salt = await bycrypt.genSalt(10);
  const pass = await bycrypt.hash(password, salt);
  await Paitient.findOneAndUpdate({username : data.username},{pass : pass});
  res.redirect("/paitientlogin");
}
catch(e){
  console.log(e.message);
  res.json({message : e.message});
}
})

module.exports = router;
