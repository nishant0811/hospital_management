function resetPass(){
  document.getElementById("myBtn").disabled = true;
  let username = document.getElementsByName('username')[0].value;
  $.post("/ereset",{username}, (data)=>{
    console.log(data);
    document.getElementsByClassName('input-box')[0].innerHTML = `
      <p>${data.message}</p>
    `;
  })
}
