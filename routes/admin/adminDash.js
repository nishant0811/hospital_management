const express = require('express');
const Emp = require("../../models/employee")
const Issues = require('../.././models/issues')
const bycrypt = require("bcryptjs")
const router = express.Router();

// Load the general Dashboard
router.get("/",(req,res)=>{
  res.render("adminDash")
})

router.post("/upIssue", async(req,res)=>{
  try{
   const issue = await Issues.findOneAndUpdate({_id:req.body.id}, {status : req.body.value },function(err){
     if(err){
       console.log(err);
     }
   })
   res.json({message :"All Good"});
  }catch(e){
    console.log(e);
  }
})

//Route to add employees
router.post("/addEmp",async (req,res)=>{
  let password = req.body.pass;
  const salt = await bycrypt.genSalt(10); // Generation of salt for hashing
  password = await bycrypt.hash(password , salt);
  const user = await Emp.findOne({UserName : req.body.username.toLowerCase()}) // checking if the username is already taken
  if(user) res.send("User already exists");
  else{ //if not then add the user
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
    console.log(e.message); // If any errors display
    res.redirect("/")
    return;
  }
  res.redirect("/admindash")
}
})

// Search for Emplyess
router.post("/getEmp", async(req,res)=>{
  const user = await Emp.findOne({UserName : req.body.username })
  console.log(user);
  if(user === null) res.json({message : "User Not Found", status : 404})
  else {
    res.json({user : user , status : 200});
  }
})



// Delete Those EMplyoess
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
