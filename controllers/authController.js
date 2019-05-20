const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
const loginIndex = (req,res) =>{
    let errorMessages = req.flash('error');
    let csrfToken = req.csrfToken();
    res.render('user/login',{layout: null,title:'Login',csrfToken, errorMessages, hasErrors: errorMessages.length > 0,siteKey:process.env.SITE_KEY});
};

const login =  passport.authenticate('local.login',{
    failureRedirect : '/user/login',
    failureFlash : true,
});

const signUpIndex = (req,res) =>{
    let errorMessages = req.flash('error');
    let csrfToken = req.csrfToken();
    res.render('user/signup',{layout: null,title: 'Signup',csrfToken, errorMessages, hasErrors: errorMessages.length > 0});
};

const signUp =  passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true,
});

const logout = (req,res,next) => {
    req.logout();
    res.redirect('/');
};

const verifyEmail = async (req,res) =>{
    let token = req.params.token;
    let userID = jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(userID,{$set:{verified: true}});
    req.flash('successVerification','Your email has been verified successfully');
    res.redirect('/');
};

const forgetPasswordIndex = async (req,res) =>{
    let errorMessages = req.flash('error');
    let successMessages = req.flash('success');
    let csrfToken = req.csrfToken();
    res.render('user/forgetPassword',{layout:null,title:'ForgetPassword',csrfToken,
        errorMessages,successMessages, hasErrors: errorMessages.length > 0,hasSuccess:successMessages.length>0});
};

const forgetPassword =async (req,res) =>{
    let user = await User.findOne({email:req.body.email});
    if(user){
        let token = generateToken(user._id,'1d');
        const url = `http://localhost:3000/user/resetPassword/${token}`;
        sendEmail(user.email, 'Password Reset','To reset your password click on the link below', url);
        req.flash('success','Password reset email has been sent to your email address');
        res.redirect('back');
    }
    req.flash('error','Email is not found');
    res.redirect('back');
};

const resetPasswordIndex = (req,res)=>{
    let errorMessages = req.flash('error');
    let successMessages = req.flash('success');
    let token = req.params.token;
    let csrfToken = req.csrfToken();
    res.render('user/resetPassword',{layout: null,title:'Reset Password', token, csrfToken,
        successMessages,errorMessages, hasErrors: errorMessages.length > 0,hasSuccess:successMessages.length>0});
};

const resetPassword = async (req,res) =>{
    let token = req.params.token;
    let userID = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(userID);
    if(req.body.password === req.body.confirmPassword){
        user.password = req.body.password;
        await user.save();
        req.flash('successPasswordReset','Your password has been reset successfully');
        res.redirect('/');
    }
    req.flash('error','Passwords do not match');
    res.redirect('back');
};

module.exports = {loginIndex,login,signUpIndex,signUp,logout,verifyEmail,forgetPasswordIndex,forgetPassword,resetPasswordIndex,resetPassword};