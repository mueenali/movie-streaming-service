const isVerified = (req,res,next) =>{
    if(req.user.verified){
        return next();
    }
    req.flash('verificationError','Please verify your email if you wish to continue using the app');
    res.redirect('/');

};

module.exports = isVerified;