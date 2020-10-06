const express = require('express');
const Emp = require("../../models/employee")
const router = express.Router();

router.get("/",(req,res)=>{
  res.render("adminDash")
})

router.post("/addEmp",async (req,res)=>{
  let employee = new Emp({
    Type: req.body.type,
    Specialization : (req.body.spec).split(","),
    Name: req.body.name,
    Address: req.body.add,
    PhoneNum: req.body.num,
    Qualification: req.body.qualification,
    Email: req.body.email,
    Pass: req.body.pass,
    UserName:req.body.username
  });

  try{
    await employee.save();
  }
  catch(e){
    res.send("Fail");
  }
  res.send("Success");
})

module.exports = router
