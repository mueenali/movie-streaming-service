const Movie = require('../models/movie');
const Category = require('../models/category');
const Review = require('../models/review');
const moment = require('moment');
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
    let reviews = await Review.find({movie:movie}).populate('user');
    let paths = {
        res720:movie.paths[0].path,
        res1080:movie.paths[1].path,
        res1440:movie.paths[2].path
    };
    res.render('appFront/movie',{sectionTitle:movie.title,movie,title: movie.title,paths,reviews});
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

const addReview = async (req,res) =>{
    try{
        let movie = req.params.id;
        let user = req.user;
        let review = new Review({
            title: req.body.title,
            content: req.body.content,
            date:moment().format('LLL'),
            user,
            movie
        });
        await review.save();
        res.redirect('back');
    }catch(err){
        req.flash('error',err.message);
        res.redirect('back');
    }
};

const calculateRating = (req,res) =>{

};




module.exports = {allMovies,moviesByCategory,thisYearReleases,showMovie,addReview};