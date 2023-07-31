const nodemailer = require("nodemailer");
require('dotenv').config(); 
const ejs = require('ejs')
const fs = require("fs")
const path = require("path")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Gmail SMTP server
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendMail = (email,message)=>{
    try {
        const templatePath = path.join(__dirname, 'email_template.ejs');
        const emailParams = {
            from: 'Shule alumni',
            to: email,
            subject: 'This is the subject.',
            html:ejs.render(fs.readFileSync(templatePath, 'utf8'), { recipientName:"BWTI",data:message }),
          };
    const response =    transporter.sendMail(emailParams)
        return response
    } catch (error) {
        console.log(error)
    }
}


module.exports= sendMail