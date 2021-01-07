const router = require('express').Router()

router.get('/', (req,res)=>{
  res.send("these are API routes");
})

module.exports = router;