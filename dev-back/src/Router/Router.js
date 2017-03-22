const express = require('express');
const router = express.Router();

const userController = require('../Controller/UserController');
const urlController = require('../Controller/UrlController');

//user routes
router.post('/register', userController.signUpAction);
router.post('/connect', userController.loginAction);
router.get('/logout', userController.logoutAction);

//url routes
router.get('/urls/:userId', urlController.getUrlsAction);
//router.get('/urls', urlController.getUrlsAction);
router.post('/urls', urlController.addAction);
router.delete('/urls/:urlId', urlController.removeAction);
router.get('/:urlMin', urlController.getBigUrlByMinUrl);

module.exports = router;
