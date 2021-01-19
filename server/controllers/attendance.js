const Attendance = require("../model/attendance");

const MARK = async (req, res) => {
  const { date, type } = req.body;
  console.log(req.body);
  if (!date || !type) {
    return res.status(400).send("Send date and type both to mark attendance!");
  }
  try {
    const employee_id = req.user._id;
    const markAttendance = new Attendance({ employee_id, date, type });
    const data = await markAttendance.save();
    return res.send(data);
  } catch (e) {
    console.log(e);
    if (e.code === 11000) {
      return res.status(400).send("attendance already marked for today!");
    }
    return res.status(500).send(e.message);
  }
};

module.exports = {
  MARK,
};
