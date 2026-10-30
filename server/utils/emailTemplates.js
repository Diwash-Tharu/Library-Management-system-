export  function generateVerificationOtpEmailTemplate(otpCode){
    return `
        <p>Your verification code is: <strong>${otpCode}</strong></p>
        <p>Please use this code to verify your email address.</p>
    `;
}



export function generateForgotPasswordEmailTemplate(resetPasswordUrl){
    return `
        <p>You requested a password reset. Please click the link below to reset your password:</p>
        <a href="${resetPasswordUrl}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
    `;
}