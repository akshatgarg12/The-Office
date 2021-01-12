const mongoose = require('mongoose')
const {ObjectId} = mongoose.SchemaTypes
const attendanceSchema = new mongoose.Schema({
  employee_id:{
    type:ObjectId,
    ref:'Employee',
    required:[true, 'employee_id is required']
  },
  date:{
    type:Date,
    required:[true, 'date is required']
  },
  type:{
    type:String,
    required:[true, 'type is required'],
    enum:['present','absent']
  }
},
{
  timestamps:true
});

module.exports = new mongoose.model('Attendance', attendanceSchema)