const successRedirect = (req,res,next) =>{
    if(req.session.oldURL){
        let oldUrl = req.session.oldURL;
        req.session.oldURL = null;
        res.redirect(oldUrl);
    }else{
        res.redirect('/');
    }
};
module.exports = successRedirect;