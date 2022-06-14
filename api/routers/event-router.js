const event_controller = require('../controllers/event-controller')
const app = require('express')

const router = app.Router()
const ROLES = require('../../config/roles')
const { checkWebToken } = require('../../middlewares-auth/verify-jwt')
const checkRoles = require('../../middlewares-auth/verify-role')


router.post('/create', [checkWebToken, checkRoles(ROLES.Admin)], event_controller.createEvent)
router.post('/join', [checkWebToken, checkRoles(ROLES.Admin, ROLES.Instructor)], event_controller.joinEvent)

module.exports = router