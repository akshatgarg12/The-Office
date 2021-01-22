const mongoose = require('mongoose')
const {ObjectId} = mongoose.SchemaTypes

const kanbanBoardSchema = new mongoose.Schema({
  employee_id: {
    type:ObjectId,
    ref:'Employee',
    required:[true, "Employee id is required"]
  },
  text:{
    type:String,
    required:[true, 'Todo text required'],
    trim:false
  },
  section: {
    type:String,
    required:[true, 'section to which the todo belongs in required'],
    enum:["Sales Department", "Management Department", "Finance Department", "Personal"]
  },
  status:{
    type:String,
    required:[true, 'status is required'],
    default:"Todo",
    enum:["Todo", "Doing", "Done"]
  }
},{
  timestamps:true
})

module.exports = new mongoose.model('KanbanBoard',kanbanBoardSchema)