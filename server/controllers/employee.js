const Employee = require('../model/employee');

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
      const employee = new Employee({...req.body})
      const data = await employee.save();
      return res.status(200).send(data._id);
    }catch(e){
      // console.log(e.message);
      return res.status(400).send(e.message);
    }
    
  }
}

module.exports = EmployeeMethods;