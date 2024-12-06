const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../Model/userModel");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    console.log(" sss");
    next({ StatusCode: 400 });
    // return res.status(401).json({
    //   status: "fail",
    //   message: "Invalid Token",
    // });
  }
  let decode = await promisify(jwt.verify)(token, process.env.SECRETE_KEY);
  let userData = await User.findById(decode.id);
  if (!userData) {
    return res.status(401).json({
      status: "fail",
      message: "User for this token is no longer exit",
    });
  }
  req.user = userData;
  next();
};
