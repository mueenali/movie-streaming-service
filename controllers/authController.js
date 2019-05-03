const passport = require('passport');

const loginIndex = (req,res) =>{
    let messages = req.flash('error');
    res.render('user/login',{layout: null,title:'Login',csrfToken: req.csrfToken(), messages, hasErrors: messages.length > 0});
};

const login =  passport.authenticate('local.login',{
    failureRedirect : '/user/login',
    failureFlash : true,
});

const signUpIndex = (req,res) =>{
    let messages = req.flash('error');
    res.render('user/signup',{layout: null,title: 'Signup',csrfToken: req.csrfToken(), messages, hasErrors: messages.length > 0});
};

const signUp =  passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true,
});

const logout = (req,res,next) => {
    req.logout();
    res.redirect('/');
};

module.exports = {loginIndex,login,signUpIndex,signUp,logout};