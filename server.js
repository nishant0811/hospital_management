const express = require("express");
const ejs = require("ejs")
const app = express();
const bp = require('body-parser')
const cookie = require("cookie-parser");
const mongoose = require('mongoose')
app.set('view engine', 'ejs');
app.use(cookie());
app.use(bp.urlencoded({extended: true}));
app.use(express.static("public"));


  mongoose.connect("",{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex : true, useFindAndModify : false})

const port = 3000 || process.env.PORT


app.use("/admindash",require(__dirname+"/routes/api/adminDash.js"));
app.use("/pullIssues", require("./routes/api/issues"));
app.use("/receptionDash",require("./routes/api/receptionDash"));
app.use("/docDash",require("./routes/api/docDash"));
app.use("/paitientDash",require("./routes/api/paitientDash"));
app.use("/wardDash",require("./routes/api/wardDash"));
app.use("/login" , require("./routes/api/login"));
app.use("/paitientlogin",require("./routes/api/paitientLogin"))
app.use("/logout",require("./routes/api/logout"));
app.use("/ereset",require("./routes/api/ereset"));
app.use("/preset",require("./routes/api/preset"));
app.use("/res",require("./routes/api/res"));


app.get("/",(req,res)=>{
  res.render("home")
})



app.post("/",(req,res)=>{
  console.log(req.body);
})
app.listen(3000,()=>{
  console.log("Server Up and running on port 3000");
})
