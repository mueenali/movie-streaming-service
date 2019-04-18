const Movie = require('../models/movie');
const Category = require('../models/category');
const allMovies = async (req,res) => {
    try{
        let categories =await Category.find();
        let movies = await Movie.find().populate('category');
        res.render('appFront/movies', {sectionTitle: 'Movies', movies,categories});
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/');
    }

};
const movie = (req,res) =>{

};

const moviesByCategory =async (req,res) =>{
    try{
        let categorySlug = req.params.slug;
        let category = await Category.findOne({slug:categorySlug});
        let categories =await Category.find();
        let movies = await Movie.find({category: category}).populate('category');
        res.render('appFront/movies',{sectionTitle:category.name,movies,categories,name :category.name});
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/movies');
    }

};

const search = (req,res) =>{

};

const addReview = (req,res) =>{

};

const thisYearReleases = async (req,res) =>{
    try{
        let date = new Date();
        let categories =await Category.find();
        let movies = await Movie.find({releaseYear : date.getFullYear()}).populate('category');
        res.render('appFront/movies',{sectionTitle:'This Year Releases',movies,categories});
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/');
    }

};

const calculateRating = (req,res) =>{

};


module.exports = {allMovies,moviesByCategory,thisYearReleases};