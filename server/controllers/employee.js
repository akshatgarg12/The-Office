const Employee = require("../model/employee");
const bcrypt = require("bcrypt");

const CREATE =  async (req, res) => {
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
    dob,
  } = req.body;
  console.log(req.body);
  if (
    !firstName ||
    !lastName ||
    !email ||
    !gender ||
    !department ||
    !position ||
    !salary ||
    isAdmin == null ||
    !img ||
    !dob
  ) {
    return res.status(400).send("please fill all the fields");
  }
  try {
    const password = firstName + String(lastName.length);
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(password, hashedPassword);
    const employee = new Employee({ ...req.body, password: hashedPassword });
    const data = await employee.save();
    return res.status(200).send(data._id);
  } catch (e) {
    // console.log(e.message);
    return res.status(400).send(e.message);
  }
}

const DELETE = async (req,res) => {
  const {_id} = req.body
  if(!_id){
    return res.status(400).send("send the id of employee to delete");
  }
  try{
    const deleteEmployee = await Employee.findOne({_id});
    await deleteEmployee.remove();
    console.log(deleteEmployee)
    return res.send("employee deleted successfully");
  }catch(e){
    return res.status(400).send(e.message)
  }
}

module.exports = {
  CREATE, DELETE
};
