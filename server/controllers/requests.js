const Request = require("../model/request");
const Employee = require("../model/employee");
const Attendance = require("../model/attendance");

const CREATE = async (req, res) => {
  const { data, type } = req.body;
  const employee_id = req.user._id;
  if (!data || !type) {
    return res.status(400).send("Please fill all the fields");
  }
  console.log(data);
  try {
    var RequestData = data;
    if (type === "leave") {
      // const leaveDates = data.dates.map(date => stringToDate(date,"dd/MM/yyyy","/"))
      const leaveDates = data.dates;
      RequestData.dates = leaveDates;
      console.log(leaveDates);
    }
    const request = new Request({
      employee_id,
      type,
      data: RequestData,
    });
    await request.save();
    return res.send(request);
  } catch (e) {
    // console.log(e)
    res.status(500).send(e.message);
  }
};

const RESOLVE = async (req, res) => {
  const resolved_by = req.user._id;
  const { _id, status } = req.body;
  console.log(req.body);
  if (!_id || !status) {
    return res.status(400).send("Please fill the status and request id");
  }
  console.log(req.body);
  // updating the issue:
  // two methods only => Accept and decline.
  if (status !== "approved" && status !== "rejected") {
    return res.status(400).send("Invalid status");
  }

  try {
    const request = await Request.findOne({ _id });
    if (!request) {
      return res.status(404).send("request not found");
    }
    // if the action is rejected dont do anything.
    if (status === "rejected") {
      request.resolved_by = resolved_by;
      request.status = "rejected";
      const newData = await request.save();
      return res.status(200).send("request has been rejected");
    }

    // work on accept for different types
    const { employee_id, type, data } = request;
    console.log(request);
    // first check the type.

    if (type === "bonus") {
      // increment employee salary on approval
      const { amount, message } = data;
      const employee = await Employee.findOne({ _id: employee_id });
      employee.salary = parseInt(employee.salary) + parseInt(amount);
      await employee.save();
      console.log("employee bonus approved (new salary): ", employee);
    }

    if (type === "leave") {
      const { dates, message } = data;
      // mark absent on employee calender on approval
      if (!dates) {
        // remove this request.
        request = { ...request, resolved_by, status: "rejected" };
        const newData = await request.save();
        return res
          .status(200)
          .send("request has been rejected due to no dates!");
      }
      const leaves = dates.map((date) => {
        return {
          date,
          type: "absent",
          employee_id,
        };
      });
      const absentLogs = await Attendance.insertMany(leaves);
      console.log("accepted leave request : ", absentLogs);
    }

    if (type === "payroll") {
      const { message } = data;
      console.log("payroll initiated for : ", request);
      // just accept
    }

    // at last marking request as approved
    request.resolved_by = resolved_by;
    request.status = "approved";
    const newData = await request.save();
    return res.status(200).send("request has been approved");
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

const DELETE = async (req, res) => {
  const {_id} = req.body
  if(!_id){
    return res.status(400).send("Send the _id of request to delete");
  }
  try{
    const deleteRequest = await Request.deleteOne({_id});
    console.log(deleteRequest)
    return res.status(200).send("request has been deleted")
  }catch(e){
    console.log(e);
    return res.status(400).send(e.message);
  }
}
// TODO: might not be required when calender is used, used this function during api testing.
// function used to create date string.
function stringToDate(_date, _format, _delimiter) {
  var formatLowerCase = _format.toLowerCase();
  var formatItems = formatLowerCase.split(_delimiter);
  var dateItems = _date.split(_delimiter);
  var monthIndex = formatItems.indexOf("mm");
  var dayIndex = formatItems.indexOf("dd");
  var yearIndex = formatItems.indexOf("yyyy");
  var month = parseInt(dateItems[monthIndex]);
  month -= 1;
  var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
  return formatedDate;
}

module.exports = {
  CREATE,
  RESOLVE,
  DELETE
};
