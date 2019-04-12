const Movie = require('../models/movie');
const Category = require('../models/category');
const allMovies = async (req,res) => {
    let categories =await Category.find();
    let movies = await Movie.find().populate('category');
    res.render('appFront/movies', {sectionTitle: 'Movies', movies,categories});
};
const movie = (req,res) =>{

};

const moviesByCategory =async (req,res) =>{
    let categorySlug = req.params.slug;
    let category = await Category.findOne({slug:categorySlug});
    let categories = await Category.find();
    let movies = await Movie.find({category: category}).populate('category');
    res.render('appFront/movies',{sectionTitle:category.name,movies,categories});
};

const search = (req,res) =>{

};

const addReview = (req,res) =>{

};

const thisYearReleases = (req,res) =>{

};

const calculateRating = (req,res) =>{

};


module.exports = {allMovies,moviesByCategory};