function pullIssues(){
  $.get("/pullIssues",(datas)=>{
      document.querySelector("#content").classList.remove("issue_form");
    document.querySelector("#content").innerHTML =""
    for(let i = datas.length-1;i>=0;i--){
     let data = datas[i];
    let issue = document.createElement('div');
    issue.classList.add("issue_form");
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
  }
  })
}


function showSearchIssue(){
  document.querySelector("#content").classList.add("issue_form");
  document.querySelector("#content").innerHTML= `
  <p>Enter details of the issue</p>
  <input id = "issue"type="text" name="query" value="" placeholder+"Your Issue">
  <button type="button" class="btn btn-primary" style="width : auto;" name="button" onclick="submitIssue()">Submit</button>
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
    document.querySelector("#content").classList.remove("issue_form");
    document.querySelector("#content").innerHTML= `
    <div id="roomsDett" class="availRooms">
    </div>
    `
    for(let i=100 ; i<200;i++){
      document.querySelector("#roomsDett").innerHTML += `
        <div class="roomdett" id="${i}">
        <p style="padding : 10px;">Room Number  ${i}</p>
        </div>
      `
    }
  data.availRooms.forEach(room =>{
    document.getElementById(room.roomNo.toString()).classList.add("Availl");
    });
  })
}

function showForm(){
  document.querySelector("#content").classList.add("issue_form");
  document.querySelector("#content").innerHTML =`
  <form action="/receptionDash/addPaitient" method="POST">
    <p>Name :</p>
    <input type="text" name="name" value="" placeholder="name">
    <p>Age :</p>
    <input type="text" name="age" value="" placeholder="age">
    <p>Phone :</p>
    <input type="text" name="phone" value="" placeholder="Phone Number">
    <p>Address :</p>
    <input type="text" name="add" value="" placeholder="Address">
    <p>Problem :</p>
    <input type="text" name="prob" value="" placeholder="Problem">
    <p>Doctor :</p>
    <input type="text" name="doc" value="" placeholder="Doctor">
    <p>Room :</p>
    <input type="text" name="room" value="" placeholder="Room">
    <p>Email :</p>
    <input type="email" name="email" value="" placeholder="Email">
    <p>Wardboy :</p>
    <input type="text" name="wardboy" value="" placeholder="wardboy">
    <p>Password :</p>
    <input type="Password" name="pass" value="" placeholder="Password">
    <p>Username :</p>
    <input type="text" name="username" value="" placeholder="username">
    <button type="submit" class="btn btn-primary" style="width : auto;" name="button">Submit</button>
  </form>
  `
}


function searchPaititentForm(){
  document.querySelector("#content").classList.add("issue_form");
  document.querySelector("#content").innerHTML= `
  <p>Enter Paitient Username :</p>
  <input id = "pDet"type="text" name="query" value="">
  <button type="button" name="button" class="btn btn-primary" style="width : auto;" placeholder="Username"onclick="searchPaititent()">Search</button>
  `
}

function searchRoom(){
  document.querySelector("#content").classList.add("issue_form");
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
  document.querySelector("#content").classList.add("issue_form");
  const usern = document.querySelector("#pDet").value;
  $.post("/receptionDash/searchPaititent",{username : usern},(data)=>{
    if(data.user){
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
      <button type="button" class="btn btn-danger" style="width : auto;" name="button" onclick="delPait('${usern}')">Delete Paitient</button>
    `
  }
  else{
    document.querySelector("#content").innerHTML= `
      <p> User Not Found </p>
    `

  }
    //console.log(data);
  })
}
function delPait(usern){
  $.post("/receptionDash/delPaitient", {usern} , (data) =>{
    document.querySelector("#content").innerHTML = `<p> ${data}</p>`;

  })
}
function showRoomForm(){
  document.querySelector("#content").classList.add("issue_form");
  document.querySelector("#content").innerHTML= `
    <p>Enter the room Number</p>
    <input id="room" type="text" name="room"  placeholder="Room Number">
    <button type="button" class="btn btn-primary" style="width : auto;" name="button" onclick="searchRoomDet()">Search</button>
    `
}
function searchRoomDet(){
  document.querySelector("#content").classList.add("issue_form");
  $.post("/receptionDash/roomDetails", {room : document.querySelector("#room").value},(data)=>{
  if(data.roomDet){
    if(data.roomDet.occupied == 1){
      let user = data.patitent
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
    }
    else{
      document.querySelector("#content").innerHTML= `
        <p>Room is Empty </p>
      `
    }
  }
  else{
    document.querySelector("#content").innerHTML= `
      <p>Invalid Room Number </p>
    `
  }
  })
}
function logout(){
  $.get("/logout");
  window.location = "http://localhost:3000/login"
}
