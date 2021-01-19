const jwt = require("jsonwebtoken");
const Employee = require("../model/employee");

const auth = async (req, res, next) => {
  const { user } = req.cookies;
  console.log("auth middleware cookies :", req.cookies);
  if (!user) {
    return res.status(403).send("Please Login in");
  }
  try {
    const data = jwt.verify(user, process.env.JWT_SECRET);
    const { _id } = data;
    const userData = await Employee.findOne({ _id });
    userData.password = undefined;
    req.user = userData;
    return next();
  } catch (e) {
    console.log(e.message);
    return res.status(403).send("Please Login in");
  }
};

module.exports = auth;
