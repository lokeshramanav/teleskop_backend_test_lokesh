const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const { registerValidator, loginValidator } = require('../requestValidator/users.validator');

router.post('/',registerValidator, userController.register);
router.post('/login',loginValidator, userController.login);
router.get('/logout',authMiddleware,  userController.logout);

module.exports = router;