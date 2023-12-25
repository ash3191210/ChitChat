const router = require('express').Router();

const UserController = require('../controllers/userController')

this.userController = new UserController()

router.get('/register',this.userController.registerRender);
router.get('/login',this.userController.loginReder)
router.get('*',this.userController.registerRender)
router.post('/register',this.userController.register)
router.post('/login',this.userController.login)

module.exports = router
