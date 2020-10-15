function pullIssues(){
  $.get("/pullIssues",(datas)=>{
    document.querySelector("#content").innerHTML =""
    datas.forEach(data =>{

    let issue = document.createElement('div');
    issue.innerHTML += `
    <p>${data.issue}</p>
    `;
    let status;

    if(data.status == 0){
      status='Not Complete';
    }
    else if (data.status == 1) {
      status = "Inprogress";
    }
    else{
      status = 'Complete';
    }
    issue.innerHTML +=`
    <p>Status : ${status}</p>
    `;
    console.log(issue);
    document.querySelector("#content").appendChild(issue)
  })
  })
}


function showSearchIssue(){
  document.querySelector("#content").innerHTML= `
  <input id = "issue"type="text" name="query" value="">
  <button type="button" name="button" onclick="submitIssue()">Submit</button>
  `
}

function submitIssue(){
  const issue = document.querySelector("#issue").value
  $.post("/pullIssues",{ issue },(data)=>{
    pullIssues();
  })
}


function showRooms(){
  $.get("/receptionDash/availRoom" , (data)=>{
  data.availRooms.forEach(room =>{
      console.log(room.roomNo);
    });
  })
}


function showRoomForm(){
  document.querySelector("#content").innerHTML= `
  <input id = "roomDet"type="text" name="query" value="">
  <button type="button" name="button" onclick="searchRoom()">Search</button>
  `
}

function searchPaititentForm(){
  document.querySelector("#content").innerHTML= `
  <input id = "pDet"type="text" name="query" value="">
  <button type="button" name="button" onclick="searchPaititent()">Search</button>
  `
}

function searchRoom(){
  const room = document.querySelector("#roomDet").value;
  $.post("/receptionDash/roomDetails",{room},(data)=>{
    const dataa = data.roomDet
    if(dataa.occupied != 0){
    document.querySelector("#content").innerHTML= `
      <p>Paitient Username : ${dataa.paitientId}</p>
      <p>Room no : ${dataa.roomNo}
      `
  }
  else {
    document.querySelector("#content").innerHTML= `
    <p>The Room is empty</p>
    `
  }
  })
}

function searchPaititent(){
  const usern = document.querySelector("#pDet").value;
  $.post("/receptionDash/searchPaititent",{username : usern},(data)=>{
    console.log(data.user);
    const user = data.user;
    document.querySelector("#content").innerHTML= `
      <p> Name : ${user.name} </p>
      <p> Address : ${user.add} </p>
      <p> Doctor : ${user.doc} </p>
      <p> Age : ${user.age} </p>
      <p> Email : ${user.email} </p>
      <p> Phone : ${user.phone} </p>
      <p> Room : ${user.room} </p>
      <p> Wardboy : ${user.wardboy} </p>
      <p> Problem : ${user.prob} </p>
    `
    console.log(data);
  })
}

function logout(){
  $.get("/logout");
  window.location = "http://localhost:3000/login"
}
