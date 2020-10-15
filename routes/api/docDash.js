const express = require('express');
const Doctor = require("../../models/doctors")
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
  res.render("doctorDash");
})


router.get("/getPaitients" ,verify,async(req,res)=>{
    try{
      const doc = await Doctor.findOne({username : req.dataa.username})
      res.send(doc)
    }
    catch(e){
      console.log(e.message);
    }
})














module.exports = router
