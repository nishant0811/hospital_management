function logout(){
  $.get("/logout");
  window.location = "http://localhost:3000/login"
}


function getRooms(){
  $.get("/wardDash/showRoom" , (data)=>{
    console.log(data);
    document.querySelector("#content").classList.add("issue_form");
    document.querySelector("#content").innerHTML = ''
    if(data.length!=0){
      data.forEach(room =>{
      document.querySelector("#content").innerHTML +=`
        <p> Room Number : ${room} </p>
        `
      })
    }
    else{
      document.querySelector("#content").innerHTML = 'Currently not incharge on any room';
    }
  })
}
