function pullIssues(){
  $.get("/pullIssues",(datas)=>{
    document.querySelector("#issues").innerHTML =""
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
    document.querySelector("#issues").appendChild(issue)
  })
  })
}
