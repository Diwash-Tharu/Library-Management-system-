// import nodeMailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config({path: "./config/config.env"});

// export const sendEmail = async ({email, subject, message})=>{
//     const transporter = nodeMailer.createTransport({
//         host: process.env.SMPT_HOST,
//         port: process.env.SMPT_PORT,
//         service: process.env.SMPT_SERVICE,
//         auth:{
//             user:process.env.SMPT_MAIL,
//             pass:process.env.SMPT_PASSWORD
//         },
//     });

//     const mailOptions ={
//         from: process.env.SMPT_MAIL,
//         to: email,
//         subject: subject,
//         text: message
//     };
//     await transporter.sendMail(mailOptions);

// }

import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
    console.log("sendEmail function called with:", { email, subject, message });
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service:process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html: message,
  });
};