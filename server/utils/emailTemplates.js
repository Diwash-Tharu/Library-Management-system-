export  function generateVerificationOtpEmailTemplate(otpCode){
    return `
        <p>Your verification code is: <strong>${otpCode}</strong></p>
        <p>Please use this code to verify your email address.</p>
    `;
}