const Movie = require('../models/movie');
const Category = require('../models/category');
const allMovies = async (req,res) => {
    try{
        let categories =await Category.find();
        let title = 'Movies';
        let movies = await Movie.find().populate('category');
        res.render('appFront/movies', {sectionTitle: title, movies,categories,title:title});
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/');
    }

};
const showMovie = async (req,res) =>{
    let movieSlug = req.params.slug;
    let movie = await Movie.findOne({slug:movieSlug}).populate('category');
    res.render('appFront/movie',{sectionTitle:movie.title,movie,title: movie.title});
};

const moviesByCategory =async (req,res) =>{
    try{
        let categorySlug = req.params.slug;
        let category = await Category.findOne({slug:categorySlug});
        let categories =await Category.find();
        let movies = await Movie.find({category: category}).populate('category');
        res.render('appFront/movies',{sectionTitle:category.name,movies,categories,name :category.name,title:category.name});
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
        let title = 'This Year Releases';
        let categories =await Category.find();
        let movies = await Movie.find({releaseYear : date.getFullYear()}).populate('category');
        res.render('appFront/movies',{sectionTitle:title,movies,categories,title:title});
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/');
    }

};

const calculateRating = (req,res) =>{

};


module.exports = {allMovies,moviesByCategory,thisYearReleases,showMovie};