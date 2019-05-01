const Movie = require('../models/movie');
const Category = require('../models/category');
const User = require('../models/user');


const index = async (req,res) =>{
    try{
        let moviesCount = await Movie.count({});
        let usersCount = await User.count({});
        let categoriesCount = await Category.count({});
        res.render('admin/index',{layout: 'admin.hbs',moviesCount,usersCount,categoriesCount});
    }catch(err){
        req.flash('err',err.message);
        res.redirect('/admin');
    }

};

module.exports = {index};