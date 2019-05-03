const isLoggedIn = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    req.session.oldURL = (req.url!== '/logout')? req.protocol + '://' + req.get('host') + req.originalUrl:null;
    res.redirect('/user/login');
};

module.exports = isLoggedIn;