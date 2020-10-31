const express = require('express');
const Emp = require("../../models/employee")
const Issues = require('../.././models/issues')
const Doc = require("../../models/doctors")
const Wardboy = require("../../models/wardboy")
const verify = require("../../middleware/verify")
const bycrypt = require("bcryptjs")
const router = express.Router();

// Load the general Dashboard
router.get("/",verify,(req,res)=>{
  if(req.auth == "Not allowed" || !req.auth){
    res.redirect("/login");
    return;
  }
  else if(req.dataa.type != 'admin') {
    res.redirect("/login");
    return;
  }
  res.render("adminDash",{ name : req.dataa.name })
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
  let doctor;
  let wardboy;
  if(req.body.type.toLowerCase() == "doctor"){

    doctor = new Doc({
    name : req.body.name,
    username : req.body.username.toLowerCase(),
    paitients : [],
    specialization : (req.body.spec).toLowerCase().split(","),
    phone : req.body.num
  })

}
else if(req.body.type.toLowerCase() == "wardboy"){

    wardboy = new Wardboy({
      name : req.body.name,
      username : req.body.username.toLowerCase(),
      phone : req.body.num,
      roomNumber : []
    })
}

  try{
    await employee.save();
    if(req.body.type.toLowerCase() == "doctor"){
    await doctor.save();
    }
    else if(req.body.type.toLowerCase() == "wardboy"){
      await wardboy.save();
    }
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
  const user = await Emp.findOne({UserName : req.body.username.toLowerCase() })
  if(user === null) res.json({message : "User Not Found", status : 404})
  else {
    res.json({user : user , status : 200});
  }
})



// Delete Those EMplyoess
router.post("/delEmp",async(req,res)=>{
  try{
    const category = await Emp.findOne({UserName : req.body.user.toLowerCase()})
    const user = await Emp.findOneAndDelete({UserName : req.body.user.toLowerCase()})
    // console.log(category.Type);
    switch(category.Type){
      case 'doctor' :
          const doctor = await Doc.findOneAndDelete({username : req.body.user.toLowerCase()});
          console.log("Found and deleted");
          break;
    }
  }
  catch(e){
    console.log(e);
    res.send({message : "Unable to delete Try again later"})
    return;
  }
  res.send({message: "Successfuly Removed"})
})

module.exports = router
