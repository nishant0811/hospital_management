const express = require('express');
const Emp = require("../../models/employee")
const bycrypt = require("bcryptjs")
const router = express.Router();

router.get("/",(req,res)=>{
  res.render("adminDash")
})

router.post("/addEmp",async (req,res)=>{
  let password = req.body.pass;
  const salt = await bycrypt.genSalt(10);
  password = await bycrypt.hash(password , salt);
  console.log(req.body.username.toLowerCase());
  const user = await Emp.findOne({UserName : req.body.username.toLowerCase()})
  console.log((req.body.spec).toLowerCase());
  if(user) res.send("User already exists");
  else{
  let employee = new Emp({
    Type: req.body.type.toLowerCase(),
    Specialization : (req.body.spec).toLowerCase().split(","),
    Name: req.body.name.toLowerCase(),
    Address: req.body.add.toLowerCase(),
    PhoneNum: req.body.num,
    Qualification: req.body.qualification.toLowerCase(),
    Email: req.body.email,
    Pass: password,
    UserName:req.body.username.toLowerCase()
  });

  try{
    await employee.save();
  }
  catch(e){
    console.log(e.message);
    res.send("Fail");
    return;
  }
  res.send("Success");
}
})


router.post("/getEmp", async(req,res)=>{
  const user = await Emp.findOne({UserName : req.body.username })
  console.log(user);
  if(user === null) res.json({message : "User Not Found", status : 404})
  else {
    res.json({user : user , status : 200});
  }
})

router.post("/delEmp",async(req,res)=>{
  try{
    const user = await Emp.findOneAndDelete({UserName : req.body.user.toLowerCase()})
  }
  catch(e){
    console.log(e);
    res.send({message : "Unable to delete Try again later"})
    return;
  }
  res.send({message: "Successfuly Removed"})
})

module.exports = router
