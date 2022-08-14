const event_controller = require('../controllers/event-controller');
const app = require('express');

const router = app.Router();
const ROLES = require('../../config/roles');
const { checkWebToken } = require('../../middlewares-auth/verify-jwt');
const checkRoles = require('../../middlewares-auth/verify-role');

router.get(
  '/getUserEvents/:user_id',
  checkWebToken,
  event_controller.getUserEvents
);
router.get('/getEvents/:admin_id', checkWebToken, event_controller.getEvents);
router.get('/getEvent/:event_id', checkWebToken, event_controller.getEvent);
router.get(
  '/getEventMembers/:event_id',
  checkWebToken,
  event_controller.getEventMembers
);
router.get(
  '/getNotInEventInstructors/:admin_id/:event_id',
  checkWebToken,
  event_controller.getNotInEventInstructors
);
router.get(
  '/getInvitationCode/:event_id',
  checkWebToken,
  event_controller.getInvitationCode
);
router.post(
  '/create',
  [checkWebToken, checkRoles(ROLES.Admin)],
  event_controller.createEvent
);
router.post(
  '/update',
  [checkWebToken, checkRoles(ROLES.Admin)],
  event_controller.updateEvent
);
router.post('/join', [checkWebToken], event_controller.joinEvent);
router.delete(
  '/removeEventMember',
  [checkWebToken, checkRoles(ROLES.Admin)],
  event_controller.removeEventMember
);
router.post(
  '/addEventInstructors',
  [checkWebToken, checkRoles(ROLES.Admin)],
  event_controller.addEventInstructors
);
router.post(
  '/addEventStudents',
  [checkWebToken, checkRoles(ROLES.Admin)],
  event_controller.addEventStudents
);

module.exports = router;
