const KanbanBoard = require('../model/kanbanBoard')

const CREATE = async (req, res) => {
  const {text,section,status} = req.body;
  const employee_id = req.user._id;
  if(!text || !section){
    return res.status(400).send("Please fill all the fields")
  }
  try{
    const newItem = new KanbanBoard({
      text, employee_id, status
    })
    await newItem.save()
    console.log(newItem)
    return res.send("successfully created new list");
  }catch(e){
    console.log(e)
    return res.status(400).send(e.message);
  }
}

const DELETE = async (req, res) => {
  const {_id} = req.body;
  if(!_id){
    return res.status(400).send("please send _id of todo to delete")
  }
  const employee_id = req.user._id;
  try{
    const item = await KanbanBoard.findOne({_id})
    if(item.employee_id === employee_id){
      await item.remove()
      return res.send("item successfully deleted")
    }else{
      return res.status(400).send("you don't have the authority to delete this")
    }
  }catch(e){
    console.log(e)
    return res.status(400).send(e.message);
  }
}

const UPDATE = async (req, res) => {
  const {_id, status} = req.body;
  if(!_id || !status){
    return res.status(400).send("please send _id and status of todo to update")
  }
  try{
    const item = await KanbanBoard.findOne({_id})
    item.status = status;
    await item.save()
    return res.send("item updated");
  }catch(e){
    console.log(e)
    return res.status(400).send(e.message);
  }
}

module.exports = {
  CREATE,
  DELETE,
  UPDATE
}