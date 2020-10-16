const express = require("express");
const Room = require("../../models/rooms");
const Paitient = require("../../models/paitient");
const Doc = require("../../models/doctors");
const Wardboy = require("../../models/wardboy");
const verify = require("../../middleware/verify")
const bycrypt = require("bcryptjs");
const router = express.Router();



router.get("/",verify,(req,res)=>{
  if(req.auth == "Not allowed" || !req.auth){
    res.redirect("/login");
    return;
  }
  else if (req.dataa.type != 'receptionisht') {
    res.redirect("/login");
    return;
  }
  res.render("receptionDash",{ name : req.dataa.name });
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
    username:req.body.username.trim().toLowerCase(),
    type : 'patitent'
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
   res.redirect("/receptionDash")
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

router.post("/delPaitient" , async(req,res)=>{
  try{
    const paititent = await Paitient.findOne({username : req.body.usern})
    await Paitient.findOneAndDelete({username : req.body.usern})
    const pati = await Doc.findOne({username : paititent.doc});
    console.log(pati.paitients.indexOf(req.body.usern));
    pati.paitients.splice(pati.paitients.indexOf(req.body.usern),1)
    console.log(pati.paitients);
    await Doc.findOneAndUpdate({username : paititent.doc} , {paitients : pati.paitients})
    await Room.findOneAndUpdate({roomNo : parseInt(paititent.room)},{occupied : 0 , paitientId : '' , wardboy :''})
    const ward = await Wardboy.findOne({username : paititent.wardboy});
    console.log(ward.roomNumber.indexOf(paititent.room));
    ward.roomNumber.splice(ward.roomNumber.indexOf(paititent.room),1);
    console.log(ward.roomNumber);
    await Wardboy.findOneAndUpdate({username : paititent.wardboy} , {roomNumber : ward.roomNumber})
    res.send("Done")
  }
  catch(e){
    console.log(e);
    res.send(e.message)
  }
})
router.post("/roomDetails", async (req,res)=>{
  try{

  const roomDet = await Room.findOne({roomNo : parseInt(req.body.room)});
  const patitent = await Paitient.findOne({username : roomDet.paitientId})
  res.send({ roomDet , patitent})
}
catch(e){
  res.send(e.message)
}
})


router.post("/searchPaititent", async(req,res)=>{
  const user = await Paitient.findOne({username :req.body.username.trim().toLowerCase()})
  res.send({ user })
})




module.exports = router;
