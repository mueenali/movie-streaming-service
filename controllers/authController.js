const passport = require('passport');

const loginIndex = (req,res) =>{
    let messages = req.flash('error');
    res.render('user/login',{layout: null,csrfToken: req.csrfToken(), messages, hasErrors: messages.length > 0});
};

const login =  passport.authenticate('local.login',{
    successRedirect: '/admin',
    failureRedirect : '/user/login',
    failureFlash : true,
});


const signUpIndex = (req,res) =>{
    let messages = req.flash('error');
    res.render('user/signup',{layout: null,csrfToken: req.csrfToken(), messages, hasErrors: messages.length > 0});
};

const signUp =  passport.authenticate('local.signup', {
    successRedirect: '/admin',
    failureRedirect: '/user/signup',
    failureFlash: true,
});

module.exports = {loginIndex,login,signUpIndex,signUp};