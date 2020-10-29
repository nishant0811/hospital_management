const express = require('express');
const verify = require("../../middleware/verify")
const Room = require("../../models/rooms");
const Paitient = require("../../models/paitient");
const Doc = require("../../models/doctors");
const Wardboy = require("../../models/wardboy");
const router = express.Router();



router.get("/",verify, (req,res)=>{
  if(req.auth == "Not allowed" || !req.auth){
    res.redirect("/paitientlogin");
    return;
  }
  else if (req.dataa.type != 'patitent') {
    res.redirect("/paitientlogin");
    return;
  }
  res.render("paitientDash",{ name : req.dataa.name });
})


router.get("/medDet",verify, async (req,res)=>{
      try{
        const user = await Paitient.findOne({username : req.dataa.username})
        res.send(user.meds)
    }
    catch(e){
      console.log(e);
    }
})

router.get("/docDet",verify,async (req,res)=>{
  try{
    const user = await Paitient.findOne({username : req.dataa.username})
    const doc = await Doc.findOne({username : user.doc})
    res.send(doc)
}
catch(e){
    console.log(e);
}
})

router.get("/wardDet",verify,async(req,res)=>{
  try{
    const user = await Paitient.findOne({username : req.dataa.username})
    const ward = await Wardboy.findOne({username : user.wardboy});
    res.send(ward)
  }
  catch(e){
  console.log(e);
  }
})

router.get("/roomNo",verify,async(req,res)=>{
  try{
    const user = await Paitient.findOne({username : req.dataa.username});
  res.send({room :user.room})
  }
  catch(e){
  console.log(e);
  }
})


module.exports = router
