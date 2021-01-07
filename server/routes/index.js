const router = require('express').Router()
// route for employee 
// route for admins
router.get('/', (req,res)=>{
  res.send("these are API routes");
})

module.exports = router;