const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local');
let validation = require('../utils/userValidation');

passport.serializeUser( (user, done) => {
    done(null, user.id);
});
passport.deserializeUser( (id, done) => {
    User.findById(id,  (err, user) => {
        done(err, user);
    });
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
        if(validation(req)){
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
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));