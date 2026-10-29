// import { generateVerificationOtpEmailTemplate } from "./emailTemplates.js";
// import { sendEmail } from "./sendEmail.js";

// export async function sendVerificationCode(verificationCode, email, res){
//     try{

//         const message= generateVerificationOtpEmailTemplate(verificationCode);
//         try{
//            await sendEmail({
//                 email,
//                 subject: "verification code (Bookworm Library Management System)"
//                 , message
//             })
//             res.status(200).json({
//                 success:true,
//                 message:`Verification code sent to ${email} successfully`
//             })

//         }
//         catch(error){
//             return res.status(500).json({
//                 success:false,
//                 message:"Error sending verification code",
//                 // error:error.message
//             })
//         }
//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"Error sending verification code",
//             // error:error.message
//         })
//     }


// }

import { generateVerificationOtpEmailTemplate } from "./emailTemplates.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(user, verificationCode, res) {
  const message = generateVerificationOtpEmailTemplate(verificationCode);
  await sendEmail({
    email: user.email,
    subject: "Verification code (Bookworm Library Management System)",
    message,
  });
}