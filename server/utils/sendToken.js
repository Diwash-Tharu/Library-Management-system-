

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

  console.log("Token:", token);

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true only on HTTPS in production
    })
    .json({
      success: true,
      user,
      message,
      token,
    });

  console.log("Set-Cookie header:", res.getHeader("Set-Cookie"));
};