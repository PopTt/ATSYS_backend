const attendance_controller = require('../controllers/attendance-controller')
const app = require('express')

const router = app.Router()
const ROLES = require('../../config/roles')
const { checkWebToken } = require('../../middlewares-auth/verify-jwt')
const checkRoles = require('../../middlewares-auth/verify-role')


//to do..

module.exports = router