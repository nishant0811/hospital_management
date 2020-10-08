const express = require('express');
const bp = require
const router = express.Router();
const Issues = require('../.././models/issues')

router.get("/",async (req,res)=>{
    const issues = await Issues.find();
    res.send(issues);
})

router.post("/",async (req,res)=>{
  const issue = new Issues({
    issue : req.body.issue,
    status : 0
  })
  try{
    await issue.save();
  }
  catch(e){
    console.log(e);
    res.send("Fail")
    return;
  }
  res.send("success")

})


module.exports = router
