const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employee = require("../model/employee");

const OneDayInSec = 1 * 24 * 60 * 60;
const getToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: OneDayInSec,
  });
  return token;
};

const __prod__ = process.env.NODE_ENV === "production";
const devCookieConfig = {
   httpOnly: true,
}
const prodCookieConfig = {
  httpOnly: true,
  sameSite: "None",
  secure: __prod__,
};
const cookieConfig = __prod__ ? prodCookieConfig : devCookieConfig

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(200).json({ user: null, error: "fill all details" });
  }
  const employee = await Employee.findOne({ email });
  if (!employee) {
    return res.status(200).json({ user: null, error: "Employee not found" });
  }
  const hashedPassword = employee.password;
  // console.log(employee);

  try {
    const match = await bcrypt.compare(password, hashedPassword);
    employee.password = undefined;
    const dob = employee.dob.toLocaleDateString();
    employee.dob = dob;
    if (match) {
      res.cookie("user", getToken(employee._id), {
        maxAge: OneDayInSec * 1000,
        ...cookieConfig,
      });
      return res.status(200).json({ user: employee, error: null });
    } else return res.status(200).json({ user: null, error: "wrong password" });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send("server is down");
  }
};

const logoutUser = (req, res) => {
  res.cookie("user", null, { maxAge: 1, ...cookieConfig });
  res.send("Successfully logged out");
};

module.exports = {
  LOGIN: loginUser,
  LOGOUT: logoutUser,
};
