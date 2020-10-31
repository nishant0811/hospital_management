const express = require('express');
const Doctor = require("../../models/doctors")
const Paitient = require("../../models/paitient")
const router = express.Router();
const verify = require("../../middleware/verify")


router.get("/",verify, (req,res)=>{
  if(req.auth == "Not allowed" || !req.auth){
    res.redirect("/login");
    return;
  }
  else if (req.dataa.type != 'doctor') {
    res.redirect("/login");
    return;
  }
  res.render("doctorDash",{ name : req.dataa.name });
})


router.get("/getPaitients" ,verify,async(req,res)=>{
    try{
      const doc = await Doctor.findOne({username : req.dataa.username})
      res.send(doc.paitients)
    }
    catch(e){
      console.log(e.message);
    }
})

router.post("/delMed" , async (req,res)=>{
  try{

  const user  = await Paitient.findOne({username :req.body.username.trim().toLowerCase()})
  let meds = user.meds;
  meds.splice(parseInt(req.body.index),1);
  await Paitient.findOneAndUpdate({username :req.body.username.trim().toLowerCase()},{ meds : meds})
  res.send("Done");
}
catch(e){
  console.log(e.message);
  res.send("Fail")
}
})
router.post("/addMed" , async (req,res)=>{
  try{
  const user  = await Paitient.findOne({username :req.body.username.trim().toLowerCase()})
  let meds = user.meds;
  meds.push(req.body.med);
  await Paitient.findOneAndUpdate({username :req.body.username.trim().toLowerCase()},{ meds : meds})
  res.send("Done");
}
catch(e){
  console.log(e.message);
  res.send("Fail")
}
})
router.post("/moredet", async(req,res)=>{
  const user = await Paitient.findOne({username :req.body.username.trim().toLowerCase()})
  res.send({ user })
})










module.exports = router
