const Employee = require('../model/employee');
const bcrypt = require('bcrypt')

const EmployeeMethods = {
  create:async (req,res) => {
      const {
        firstName,
        lastName,
        email,
        gender,
        department,
        position,
        salary,
        isAdmin,
        img,
        dob
    } = req.body;
    console.log(req.body);
    if(!firstName || !lastName || !email || !gender || !department || !position || !salary || isAdmin == null || !img || !dob){
      return res.status(400).send("please fill all the fields");
    }
    try{
      const password = firstName+String(lastName.length);
      const hashedPassword = await bcrypt.hash(password,8);
      console.log(password, hashedPassword);
      const employee = new Employee({...req.body, password:hashedPassword})
      const data = await employee.save();
      return res.status(200).send(data._id);
    }catch(e){
      // console.log(e.message);
      return res.status(400).send(e.message);
    }
    
  }
}

module.exports = EmployeeMethods;