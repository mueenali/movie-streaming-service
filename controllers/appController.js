const Movie = require('../models/movie');
const index = async (req,res) =>{
    try{
        let passwordReset = req.flash('successPasswordReset');
        let emailVerification = req.flash('successVerification');
        let verificationError = req.flash('verificationError');
        let movies = await Movie.find().limit(6).populate('category');
        let newItems = await Movie.find().sort({_id : -1}).limit(4).populate('category');
        res.render('appFront/index',{title:'FilxGo',movies,newItems,verificationError,passwordReset,
            emailVerification,emailHeading:'Email Verification',resetHeading:'Password Reset Successfully'});
    }catch(err){
    }
};
module.exports = {index};