const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(email , token) {
  try{
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    let link = "http://localhost:3000/res/"+token;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
     port: 465,
     secure: true, // use SSL
      auth: {
        user: "", // generated ethereal user
        pass: "", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'test@test.com', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "", // plain text body
      html: "<p>Your Password Reset link is : <a href='"+link+"'>"+link+"</a></p>", // html body
    });
  }
  catch(err){
    console.log(err.message);
  }
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = main;
