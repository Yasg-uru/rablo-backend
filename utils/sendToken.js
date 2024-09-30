const sendtoken = function (statuscode, res, user, token) {
  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
    sameSite: "none",
    secure: true,
  };
  console.log("this is a date of cookie -expire:", options.expires);
  console.log("this is a token ", token);
  res.cookie("token", token, options).status(statuscode).json({
    success: true,
    user,
    token,
  });
};
export default sendtoken;
