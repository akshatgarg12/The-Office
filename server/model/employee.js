const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      lowercase: true,
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email must be unique"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
      enum: ["Male", "Female", "Other"],
    },
    department: {
      type: String,
      required: [true, "department is required"],
      enum: ["Sales Department", "Management Department", "Finance Department"],
    },
    position: {
      type: String,
      required: [true, "position is required"],
      enum: ["Intern", "Regular Employee", "Manager"],
    },
    branch: {
      type: String,
      required: [true, "branch is required"],
      enum: ["Scranton", "Akron", "Utica"],
    },
    salary: {
      type: Number,
      required: [true, "salary is required"],
    },
    isAdmin: {
      type: Boolean,
      required: [true, "isAdmin is required"],
    },
    img: {
      type: String,
      required: [true, "img is required"],
    },
    dob: {
      type: Date,
      required: [true, "dob is required"],
    },
  },
  {
    timestamps: true,
  }
);


const Attendance = require('./attendance')
const Request = require('./request')
const KanbanBoard = require('./kanbanBoard')

employeeSchema.pre('remove',async function(next){
    const {_id} = this;
    try{
      const deleteAttendance = await Attendance.deleteMany({employee_id : _id})
      const deleteRequests = await Request.deleteMany({employee_id : _id})
      const deleteKanbans = await KanbanBoard.deleteMany({employee_id : _id})
      next();
    }catch(e){
      throw new Error(e.message)
    }
})

module.exports = new mongoose.model("Employee", employeeSchema);
