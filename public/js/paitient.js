
function getDoc(){
  $.get("/paitientDash/docDet", (data)=>{
    //console.log(data);
    document.querySelector("#content").classList.add("issue_form");
    document.querySelector("#content").innerHTML= `
      <p> Name : ${data.name} </p>
      <p> Phone : ${data.phone} </p>
      <p> Specialization : ${data.specialization[0]} </p>
      <p> UserName : ${data.username} </p>
    `;
  })
}

function getMeds(){
  $.get("/paitientDash/medDet", (data)=>{
    document.querySelector("#content").classList.add("issue_form");
    document.querySelector("#content").innerHTML = ``;
    if(data.length !=0 ){
      data.forEach( med =>{
        document.querySelector("#content").innerHTML += `
          <p> Name : ${med} </p>
        `;
      })
    }
    else{
      document.querySelector("#content").classList.add("issue_form");
      document.querySelector("#content").innerHTML= `
        <p> No Meds prescribed till now, Kindly contact the Doctor if you need any. </p>
      `;
    }
  })
}

function getRoom(){
  $.get("/paitientDash/roomNo",(data)=>{
    document.querySelector("#content").classList.add("issue_form");
    document.querySelector("#content").innerHTML= `
      <p> Admitted in : ${data.room} </p>
    `;
  })
}

function getWard(){

  $.get("/paitientDash/wardDet", (data) =>{
    document.querySelector("#content").classList.add("issue_form");
    document.querySelector("#content").innerHTML= `
      <p> Name : ${data.name} </p>
      <p> Phone : ${data.phone} </p>
      <p> UserName : ${data.username} </p>
    `;
  })
}



function logout(){
  $.get("/logout");
  window.location = "http://localhost:3000/paitientlogin"
}
