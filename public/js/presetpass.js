function resetPass(){
  document.getElementById("myBtn").disabled = true;
  let username = document.getElementsByName('username')[0].value;
  console.log(username);
  $.post("/preset",{username}, (data)=>{
    console.log(data);
    document.getElementsByClassName('input-box')[0].innerHTML = `
      <p>${data.message}</p>
    `;
  })
}
