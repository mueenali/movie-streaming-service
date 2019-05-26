const express = require('express');
const router = express.Router();
const csurf = require('csurf');
const csrfProtection = csurf();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const successRedirect = require('../middlewares/successRedirect');
const notLoggedIn = require('../middlewares/notLoggedIn');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('/logout',isLoggedIn,authController.logout);
router.use(csrfProtection);
router.get('/verify/:token',authController.verifyEmail);
router.get('/forgetPassword',authController.forgetPasswordIndex);
router.post('/forgetPassword',authController.forgetPassword);
router.get('/resetPassword/:token',authController.resetPasswordIndex);
router.put('/resetPassword/:token',authController.resetPassword);
router.get('/profile',isLoggedIn,userController.profile);
router.post('/profile/',isLoggedIn,userController.editProfile);
router.use(notLoggedIn);
router.get('/login',authController.loginIndex);
router.post('/login',authController.login,successRedirect);

router.get('/signup',authController.signUpIndex);
router.post('/signup',authController.signUp,successRedirect);


module.exports = router;
