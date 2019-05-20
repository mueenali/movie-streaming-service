const passport = require('passport');
const User = require('../models/user');
const axios = require('axios');
const LocalStrategy = require('passport-local');
let validation = require('../utils/userValidation');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    }).populate('role');
});


passport.use('local.signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        req.checkBody('email', 'Invalid email').isEmail().notEmpty();
        req.checkBody("password").isLength({min: 6}).withMessage('Must be at least 6 chars long')
            .matches('[0-9]').withMessage('Must contain at least one number')
            .matches('[a-z]').withMessage('Must contain at least one lowercase latter')
            .matches('[A-Z]').withMessage('Must contain at least one uppercase latter');

        if (validation(req)) {
            return done(null, false);
        }
        try {
            let user = await User.findOne({email: email});
            if (user) {
                return done(null, false, {message: 'Email is already in use'});
            }
            let newUser = new User(req.body);
            await newUser.save();
            let token = generateToken(newUser._id, "365d");
            const url = `http://localhost:3000/user/verify/${token}`;
            let mailContent = `hey ${newUser.name},you are almost ready to start enjoying FlixGo, Simply click the link below to verify your email address`;
            sendEmail(newUser.email, 'Email Confirmation', mailContent, url);
            return done(null, newUser);
        } catch (err) {
            return done(err);
        }
    }
));

passport.use('local.login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        req.checkBody('email', 'Invalid email').isEmail().notEmpty();
        if (validation(req)) {
            return done(null, false);
        }
        try {
            let user = await User.findOne({email: email});
            if (!user) {
                return done(null, false, {message: 'No user found'});
            }
            if (!user.matchedPassword(password)) {
                return done(null, false, {message: 'Wrong password'});
            }
            if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
                return done(null, false, {message: 'Please select captcha'})
            }
            const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.SECRET_KEY + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
            let result = await axios.post(verificationUrl);
            if(result.data.success !== undefined && !result.data.success) {
                return done(null,false,{message:"Failed captcha verification"});
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));