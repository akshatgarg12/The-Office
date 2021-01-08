const router = require('express').Router()
const fileUpload = require('../controllers/fileUpload')
const EmployeeMethods = require('../controllers/employee')
const Login = require('../controllers/login')
// route for employee 
// route for admins


router.post('/employee',EmployeeMethods.create);
router.post('/fileUpload',fileUpload);
router.post('/login', Login)

module.exports = router;