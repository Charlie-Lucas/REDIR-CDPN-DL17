const express = require('express');
const router = express.Router();

const userController = require('../Controller/UserController');
const urlController = require('../Controller/UrlController');

//user roots
// router.get('/', userController.indexAction);

// router.post('/register', userController.signUpAction);

// router.post('/connect', userController.loginAction);

// router.get('/logout', userController.logoutAction);

//url roots
router.get('/urls/:userId', urlController.getUrlsAction);
//router.post('/add-url', userController.addAction);

//router.delete('/remove-url/:id(\\d+)', userController.removeAction);

module.exports = router;
