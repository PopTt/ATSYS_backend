const attendance_controller = require('../controllers/attendance-controller');
const app = require('express');

const router = app.Router();
const ROLES = require('../../config/roles');
const { checkWebToken } = require('../../middlewares-auth/verify-jwt');
const checkRoles = require('../../middlewares-auth/verify-role');

router.get(
  '/getEventAttendances/:event_id',
  checkWebToken,
  attendance_controller.getEventAttendances
);
router.get(
  '/getUsersEventAttendances/:attendace_id',
  checkWebToken,
  attendance_controller.getUsersEventAttendances
);
router.post(
  '/create',
  [checkWebToken, checkRoles(ROLES.Admin, ROLES.Instructor)],
  attendance_controller.createAttendance
);

module.exports = router;
