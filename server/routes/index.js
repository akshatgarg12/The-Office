const router = require('express').Router()
const fileUpload = require('../controllers/fileUpload')
const EmployeeMethods = require('../controllers/employee')
const Login = require('../controllers/login')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')

// routes for employee table
router.post('/employee',EmployeeMethods.create);

// route to upload images
router.post('/fileUpload',fileUpload);

// login script
router.post('/login', Login)

// middleware checks
// router.get('/all',auth,isAdmin,(req,res)=>{
//   res.send(req.user);
// })


module.exports = router;