

// export const sendToken = (user, statusCode, message, res) =>{
//     const token = user.generateToken();
//     res.status(statusCode).cookie("token", token, {
//         expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
//         httpOnly:true,
//     }).json({
//         success:true,
//         message,
//         user,
//         token
//     })
// }


export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();
  const days = Number(process.env.COOKIE_EXPIRE) || 7;

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};