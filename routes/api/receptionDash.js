const express = require("express");
const Room = require("../../models/rooms");
const Paitient = require("../../models/paitient");
const Doc = require("../../models/doctors");
const Wardboy = require("../../models/wardboy");
const bycrypt = require("bcryptjs");
const router = express.Router();



router.get("/",(req,res)=>{
  res.render("receptionDash");
})

router.get("/availRoom",async (req,res)=>{
  let avail
  try{
  avail =  await Room.find({occupied : 0})
  }
  catch(e){
    console.log(e.message);
    res.json({message :"Internal Error Occured" , status : 500})
    return;
  }
  res.json({message:"All Good", status : 200 , availRooms : avail})
})


router.post("/addPaitient",async (req,res)=>{
  let password = req.body.pass;
  const salt = await bycrypt.genSalt(10); // Generation of salt for hashing
  password = await bycrypt.hash(password , salt);

  const user = await Paitient.findOne({username : req.body.username.trim().toLowerCase()})
  if(!user)
{  const newPaitient = new Paitient({
    name :req.body.name ,
    age :req.body.age,
    phone :req.body.phone,
    add:req.body.add,
    prob:req.body.prob,
    doc:req.body.doc.toLowerCase(),
    room:req.body.room,
    meds:[],
    email:req.body.email,
    wardboy:req.body.wardboy.toLowerCase(),
    pass:password,
    username:req.body.username.trim().toLowerCase()
  })
  try{

   let p = await Doc.findOne({username : newPaitient.doc});
   p.paitients.push(newPaitient.username)
   await Doc.findOneAndUpdate({username : newPaitient.doc} , {paitients: p.paitients} , (err)=>{
     if(err){
       console.log(err);
     }
   })
   await Room.findOneAndUpdate({roomNo : parseInt(newPaitient.room)},{paitientId : newPaitient.username , occupied : 1 , wardboy : newPaitient.wardboy});
   let ward =  await Wardboy.findOne({username : newPaitient.wardboy})
   console.log(newPaitient.room);
   console.log(ward.roomNumber);
   ward.roomNumber.push(parseInt(newPaitient.room))
   console.log(ward.roomNumber);
   await Wardboy.findOneAndUpdate({username : newPaitient.wardboy},{roomNumber : ward.roomNumber})
   await newPaitient.save();
   res.send("Done")
  }
  catch(e){
    console.log(e);
    res.send("Error");
  }
}
else{
  res.json({
    message : "User already exists"
  })
}

})
router.post("/roomDetails", async (req,res)=>{
  const roomDet = await Room.findOne({roomNo : parseInt(req.body.room)});
  res.send({ roomDet})
})


router.post("/searchPaititent", async(req,res)=>{
  const user = await Paitient.findOne({username :req.body.username.trim().toLowerCase()})
  res.send({ user })
})

router.post("/deletePaititent", async(req,res)=>{
  try{
    await Paitient.findOneAndDelete({username :req.body.username.trim().toLowerCase()})
  }
  catch(e){
    console.log(e);
  }
})


module.exports = router;
