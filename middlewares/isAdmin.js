const isAdmin = (req,res,next)=>{
    if(req.user.role === null){
        res.render('404');
    }
    else if(req.user.role.name === "Admin"){
        return next();
    }
};

module.exports = isAdmin;
