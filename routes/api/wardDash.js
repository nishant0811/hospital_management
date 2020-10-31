const express = require('express');
const verify = require("../../middleware/verify")
const Ward = require("../../models/wardboy.js")
const router = express.Router();

router.get("/",verify,(req,res)=>{
  if(req.auth == "Not allowed" || !req.auth){
    res.redirect("/login");
    return;
  }
  else if (req.dataa.type != 'wardboy') {
    res.redirect("/login");
    return;
  }
  res.render("wardDash",{ name : req.dataa.name });
})

router.get("/showRoom",verify, async(req,res)=>{

  const ward = await Ward.findOne({username : req.dataa.username})
  res.send(ward.roomNumber)
})



















module.exports = router
