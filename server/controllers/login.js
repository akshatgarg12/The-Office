const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Employee = require('../model/employee')

const loginUser = async (req,res) => {
  const {email, password} = req.body
  if(!email || !password){
    return res.status(200).json({user:null, error:"fill all details"});
  }
  const employee = await Employee.findOne({email});
  if(!employee){
    return res.status(200).json({user:null, error:"Employee not found"});
  }
  const hashedPassword = employee.password
  console.log(employee);

  try{
    const match = await bcrypt.compare(password, hashedPassword);
    employee.password = undefined;
    if(match)
      return res.status(200).json({user:employee, error:null});
    else 
      return res.status(200).json({user:null, error:"wrong password"});
  }
  catch(e){
    return res.status(500).send("server is down");
  }
}

module.exports = loginUser;