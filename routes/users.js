const express = require('express');
const router = express.Router();
const csurf = require('csurf');
const csrfProtection = csurf();
const authController = require('../controllers/authController');
/* GET users listing. */

router.use(csrfProtection);

router.get('/login',authController.loginIndex);
router.post('/login',authController.login);

router.get('/signup',authController.signUpIndex);
router.post('/signup',authController.signUp);

module.exports = router;
