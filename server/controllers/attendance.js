const Attendance = require('../model/attendance')

const MARK = async (req,res) => {
  const {date, type} = req.body;
  if(!date || !type){
    return res.status(400).send("Send date and type both to mark attendance!")
  }
  const employee_id = req.user._id;
  const markAttendance = new Attendance({employee_id, date, type});
  const data = await markAttendance.save();
  return res.send(data);
}

module.exports = {
  MARK
}