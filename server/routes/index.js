const router = require('express').Router()
const fileUpload = require('../controllers/fileUpload')
const EmployeeMethods = require('../controllers/employee');
// route for employee 
// route for admins


router.post('/employee',EmployeeMethods.create);
router.post('/fileUpload',fileUpload);

module.exports = router;