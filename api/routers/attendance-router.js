const attendance_controller = require('../controllers/attendance-controller');
const app = require('express');

const router = app.Router();
const ROLES = require('../../config/roles');
const { checkWebToken } = require('../../middlewares-auth/verify-jwt');
const checkRoles = require('../../middlewares-auth/verify-role');

router.get(
  '/getAttendance/:attendance_id',
  checkWebToken,
  attendance_controller.getAttendance
);

router.get(
  '/getEventAttendances/:event_id',
  checkWebToken,
  attendance_controller.getEventAttendances
);

router.get(
  '/getUsersEventAttendances/:attendance_id',
  checkWebToken,
  attendance_controller.getUsersEventAttendances
);

router.post(
  '/create',
  [checkWebToken, checkRoles(ROLES.Admin, ROLES.Instructor)],
  attendance_controller.createAttendance
);

router.post(
  '/updateAttendance',
  [checkWebToken, checkRoles(ROLES.Admin, ROLES.Instructor)],
  attendance_controller.updateAttendance
);

router.get(
  '/getQRCode/:attendance_id',
  checkWebToken,
  attendance_controller.getAttendanceQRCode
);

router.post(
  '/createFlash',
  [checkWebToken, checkRoles(ROLES.Admin, ROLES.Instructor)],
  attendance_controller.createFlash
);

router.post(
  '/updateFlash',
  [checkWebToken, checkRoles(ROLES.Admin, ROLES.Instructor)],
  attendance_controller.updateFlash
);

router.get(
  '/getFlash/:attendance_id',
  [checkWebToken],
  attendance_controller.getAttendanceFlash
);

router.get(
  '/checkFlashAns/',
  [checkWebToken],
  attendance_controller.checkFlashAns
);

router.post(
  '/assignUsers/',
  [checkWebToken],
  attendance_controller.assignUserAttendance
);

router.post(
  '/updateUserAttendance/',
  [checkWebToken, checkRoles(ROLES.Admin, ROLES.Instructor)],
  attendance_controller.updateUserAttendanceStatus
);

router.post(
  '/signAttendance/',
  [checkWebToken, checkRoles(ROLES.User)],
  attendance_controller.updateUserAttendanceStatus
);

router.post(
  '/updateStatus',
  [checkWebToken, checkRoles(ROLES.Admin, ROLES.Instructor)],
  attendance_controller.updateUserAttendanceStatusManually
);

router.delete(
  '/deleteAttendance',
  [checkWebToken, checkRoles(ROLES.Admin)],
  attendance_controller.deleteAttendance
);

module.exports = router;
