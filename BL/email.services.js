const nodemailer = require('nodemailer');


async function sendMail(email, subject, html) {
    console.log({email, subject, html});
    try {
      const transporter =  nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "hamal.b2023@gmail.com",
          pass: "zlnbtdfvvtycunin"
        }
      });
      const mailOptions ={
        from: "כיתת כוננות hamal.b2023@gmail.com",
        to: email,
        subject: subject,
        html: html
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
    } catch (error) {
      throw { message: "something went wrong" }
  
    }
  
  }

  module.exports = {
    sendMail
  };
  