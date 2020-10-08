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
