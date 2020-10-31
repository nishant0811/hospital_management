function addmargin(){
  document.querySelector("#content").classList.add("marginn");
}

function removemargin(){
  document.querySelector("#content").classList.remove("marginn");
}



function pullIssues(){
  $.get("/pullIssues",(datas)=>{
    document.querySelector("#content").classList.remove("issue_form");
    document.querySelector("#content").innerHTML =""
    addmargin();
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
    <button type="button" class="btn btn-warning "name="button" onclick="updateIssue('${data._id}',1)">Inprogress</button>
    <button type="button" class ="btn btn-success"name="button" onclick="updateIssue('${data._id}',2)">Completed</button>
    `;
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
  removemargin();
  document.querySelector("#content").classList.add("issue_form");
  document.querySelector("#content").innerHTML = `
  <p>Enter the username</p>
  <input id='username' type="text" name="username" value="">
  <button type="button" class="btn btn-primary"name="button" onclick="pullEmpDet()">search</button>
  `
}

function pullEmpDet(){
  removemargin();
  document.querySelector("#content").classList.add("issue_form");
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
    removemargin();
    document.querySelector("#content").classList.add("issue_form");
    document.querySelector("#content").innerHTML = `
    ${data.message}`
  })
}


function addEmp(){
  removemargin();
  document.querySelector("#content").classList.add("issue_form");
  document.querySelector("#content").innerHTML =`
  <form class="" action="/admindash/addEmp" method="post">
    <p>Category</p>
    <input type="text" name="type" value="" required>
    <p>Specialization</p>
    <input type="text" name="spec" value="">
    <p>Name</p>
    <input type="text" name="name" value="" required>
    <p>Address</p>
    <textarea name="add" rows="10" cols="80" required style="background"></textarea>
    <p>Phone Number</p>
    <input type="number" name="num" value="" required>
    <p>Qualification</p>
    <input type="text" name="qualification" value="" required>
    <p>Email</p>
    <input type="email" name="email" value="" required>
    <p>Password</p>
    <input type="password" name="pass" value="" required>
    <p>Username</p>
    <input type="text" name="username" value="" required>
    <button class="btn btn-primary" type="submit" name="button">Submit</button>
  </form>
  `
}


function logout(){
  $.get("/logout");
  window.location = "http://localhost:3000/login"
}
