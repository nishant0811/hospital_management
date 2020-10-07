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

function showSearch(){
  document.querySelector("#content").innerHTML = `
  <p>Enter the username</p>
  <input id='username' type="text" name="username" value="">
  <button type="button" name="button" onclick="pullEmpDet()">search</button>
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
    <button type="button" name="button" onclick="delEmp('${data.user.UserName}')">Remove</button>
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
