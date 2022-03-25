require('dotenv').config();


const express = require('express');
const nodemailer = require('nodemailer');
const router = require('./userRouter');
const app = express.Router();



app.get('/', (req, res) => res.send({msg: "send contact form using post" }));

app.post('/', (req, res) => {

    const{name, email, message} = req.body;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.Mail,
          pass: process.env.PASS,
        }
      });
      
      var mailOptions = {
        from: email,
        to: 'xolamagatya86@gmail.com',
        subject: `${subject}`,
        text: `Name: ${name}
        Email: ${email}
        Sent the Below Message
        ${message}`,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(400).send({msg: "Email could not be sent" + error });
        } else {
          console.log('Email sent: ' + info.response);
          res.send({msg: "Message sent successfully" });
        }
      });
});

  



module.exports = app;