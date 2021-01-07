const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:[true, 'firstName is required']
  },
  lastName:{
    type:String,
    required:[true, 'lastName is required']
  },
  email:{
    type:String,
    required:[true, 'email is required'],
    unique:[true, 'email must be unique']
  },
  gender:{
    type:String,
    required:[true, 'gender is required'],
    enum: ['Male', 'Female', 'Other']
  },
  department:{
    type:String,
    required:[true, 'department is required'],
    enum: ['Sales Department', 'Management Department', 'Marketing Department']
  },
  position:{
    type:String,
    required:[true, 'position is required'],
    enum: ['Intern', 'Regular Employee', 'Manager']
  },
  salary:{
    type:Number,
    required:[true, 'salary is required']
  },
  isAdmin:{
    type:Boolean,
    required:[true, 'isAdmin is required']
  },
  img:{
    type:String,
    required:[true, 'img is required']
  },
  dob:{
    type:Date,
    required:[true, 'dob is required']
  }
}, {
  timestamps:true
})

module.exports = new mongoose.model('Employee', employeeSchema);