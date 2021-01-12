const router = require('express').Router()
const fileUpload = require('../controllers/fileUpload')
const employeeActions= require('../controllers/employee')
const attendanceActions = require('../controllers/attendance') 
const userActions = require('../controllers/userActions')
const requestActions = require('../controllers/requests')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
// routes for employee table
router.post('/employee',auth,isAdmin,employeeActions.CREATE)

// route to upload images
router.post('/fileUpload',fileUpload)

// login script
router.post('/login', userActions.LOGIN)
router.post('/logout', userActions.LOGOUT)

// attendance mark
router.post('/attendance',auth,attendanceActions.MARK)

// requests
router.post('/request',auth,requestActions.CREATE)
// resolving requests
router.patch('/request', auth, isAdmin,requestActions.RESOLVE)

module.exports = router;