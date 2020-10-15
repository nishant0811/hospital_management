function logout(){
  $.get("/logout");
  window.location = "http://localhost:3000/login"
}

function getPaitients(){
  $.get("/docDash/getPaitients",(data)=>{
    console.log(data);
  })
}
