const router = require("express").Router();
const fileUpload = require("../controllers/fileUpload");
const employeeActions = require("../controllers/employee");
const attendanceActions = require("../controllers/attendance");
const userActions = require("../controllers/auth");
const requestActions = require("../controllers/requests");
const postActions = require("../controllers/post");
const kanbanBoardActions = require('../controllers/kanbanBoard');
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

// routes for employee creation and deletion
router.route('/employee')
      .post(auth, isAdmin, employeeActions.CREATE)
      .delete(auth, isAdmin, employeeActions.DELETE)

// route to upload images
router.post("/fileUpload", fileUpload);

// auth routes
router.post("/login", userActions.LOGIN);
router.post("/logout", userActions.LOGOUT);

// attendance marking
router.post("/attendance", auth, attendanceActions.MARK);

// requests : leave, payroll, bonus (CUD)
router.route('/request')
      .post(auth, requestActions.CREATE)
      .patch(auth, isAdmin, requestActions.RESOLVE)
      .delete(auth,requestActions.DELETE)

// creating and deleting a post in discussion
router.route('/post')
      .post(auth, postActions.CREATE)
      .delete(auth, postActions.DELETE)

// kanban board and personal todoList
router.route('/kanban')
      .post(auth,kanbanBoardActions.CREATE)
      .delete(auth, kanbanBoardActions.DELETE)
      .patch(auth, kanbanBoardActions.UPDATE)

      
module.exports = router;
