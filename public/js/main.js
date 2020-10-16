function pullIssues(){
  $.get("/pullIssues",(datas)=>{
    document.querySelector("#content").innerHTML =""
    for(let i = datas.length-1;i>=0;i--){
     let data = datas[i];
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
    <button type="button" class="bg-warning"name="button" onclick="updateIssue('${data._id}',1)">Inprogress</button>
    <button type="button" class ="bg-success"name="button" onclick="updateIssue('${data._id}',2)">Completed</button>
    <hr>
    `;
    console.log(issue);
    document.querySelector("#content").appendChild(issue)
  }
  })
}

function updateIssue(id,value){
  $.post("/adminDash/upIssue",{id , value}, (data)=>{
    pullIssues();
  })
}

function showSearch(){
  document.querySelector("#content").innerHTML = `
  <p>Enter the username</p>
  <input id='username' type="text" name="username" value="">
  <button type="button" class="btn btn-primary"name="button" onclick="pullEmpDet()">search</button>
  `
}

function pullEmpDet(){
  const username = document.querySelector("#username").value;
  $.post("/adminDash/getEmp",{ username }, (data) =>{
    if(data.status === 200){
    document.querySelector("#content").innerHTML = `
    <p>Name : ${data.user.Name}</p>
    <p>Type : ${data.user.Type}</p>
    <p>Specialization : ${data.user.Specialization}</p>
    <p>Email : ${data.user.Email}</p>
    <p>Phone : ${data.user.PhoneNum}</p>
    <button type="button" class="btn btn-danger"name="button" onclick="delEmp('${data.user.UserName}')">Remove</button>
    `
  }
  else{
    document.querySelector("#content").innerHTML += `
    <p>User Not Found</p>
    `
  }
  })
}

function delEmp(user){

  $.post("/adminDash/delEmp",{user},(data)=>{
    document.querySelector("#content").innerHTML = `
    ${data.message}`
  })
}


function addEmp(){
  document.querySelector("#content").innerHTML =`
  <form class="" action="/admindash/addEmp" method="post">
    <p>Category</p>
    <input type="text" name="type" value="">
    <p>Specialization</p>
    <input type="text" name="spec" value="">
    <p>Name</p>
    <input type="text" name="name" value="">
    <p>Address</p>
    <textarea name="add" rows="10" cols="80"></textarea>
    <p>Phone Number</p>
    <input type="number" name="num" value="">
    <p>Qualification</p>
    <input type="text" name="qualification" value="">
    <p>Email</p>
    <input type="email" name="email" value="">
    <p>Password</p>
    <input type="text" name="pass" value="">
    <p>Username</p>
    <input type="text" name="username" value="">
    <button class="btn btn-primary" type="submit" name="button">Submit</button>
  </form>
  `
}


function logout(){
  $.get("/logout");
  window.location = "http://localhost:3000/login"
}
