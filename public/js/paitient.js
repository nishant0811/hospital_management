
function getDoc(){
  $.get("/paitientDash/docDet", (data)=>{
    console.log(data);
  })
}

function getMeds(){
  $.get("/paitientDash/medDet", (data)=>{
    console.log(data);
  })
}

function getRoom(){
  $.get("/paitientDash/roomNo",(data)=>{
    console.log(data);
  })
}

function getWard(){
  $.get("/paitientDash/wardDet", (data) =>{
    console.log(data);
  })
}



function logout(){
  $.get("/logout");
  window.location = "http://localhost:3000/paitientlogin"
}
