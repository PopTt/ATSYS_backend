const user_controller = require('../controllers/user-controller')
const app = require('express')

const router = app.Router()
const ROLES = require('../../config/roles')
const { checkWebToken } = require('../../middlewares-auth/verify-jwt')
const checkRoles = require('../../middlewares-auth/verify-role')


router.get('/', checkWebToken, user_controller.getUser)
router.get('/:user_id', checkWebToken, user_controller.getUserByUID)

router.patch('/', checkWebToken, user_controller.updateUser)
router.delete('/', checkWebToken, user_controller.deleteUser)

router.post('/register', user_controller.register)
router.post('/logout', checkWebToken, user_controller.logout)
router.post('/login', user_controller.login)

module.exports = router