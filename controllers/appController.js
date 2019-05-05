const Movie = require('../models/movie');
const index = async (req,res) =>{
    try{
        let successMessages = req.flash('success');
        let verificationError = req.flash('verificationError');
        let movies = await Movie.find().limit(6).populate('category');
        let newItems = await Movie.find().sort({_id : -1}).limit(4).populate('category');
        res.render('appFront/index',{title:'FilxGo',movies,newItems,successMessages,verificationError,
            hasSuccess:successMessages.length>0});
    }catch(err){

    }

};
module.exports = {index};