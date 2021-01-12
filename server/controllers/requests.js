const Request = require('../model/request')

const CREATE = async (req,res) => {
  const {data, type} = req.body;
  const employee_id = req.user._id;
  if(!data || !type){
    return res.status(400).send('Please fill all the fields')
  }
  try{
    const data = new Request({
      employee_id, type, data
    })
    await data.save();
    res.send(data)
  }catch(e){
    console.log(e)
    res.status(500).send(e.message)
  }
}

const RESOLVE = async (req,res) => {
  const resolved_by = req.user._id;
  const {_id, status} = req.body;
  if(!_id || !status){
    return res.status(400).send('Please fill the status and request id')
  }
  // updating the issue:
  // two methods only => Accept and decline.
  try{
    const request = await Request.findOne({_id})
    if(!request){
      return res.status(404).send('request not found')
    }
    if(status === 'approved' || status === 'rejected'){
      request = {...request, resolved_by, status};
      const newData = await request.save();
      return res.status(200).send(newData);
    }
    return res.status(400).send('Invalid status');
  }catch(e){
     console.log(e)
     res.status(500).send(e.message)
  } 
}

module.exports = {
  CREATE,
  RESOLVE
}