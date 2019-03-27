const Movie = require('../models/movie');

const fs = require('fs');
const Category = require('../models/category');
const uploads = require('../utils/uploads');

const index = async (req,res) =>{
    let movies = await Movie.find().populate('category');
    res.render('admin/movies/index',{layout: 'admin.hbs',movies});
};

const show = async (req,res) =>{
    let movieId = req.params.id;
    let movie =  await Movie.findById(movieId);
    req.session.movieId = movieId;
    res.render('admin/movies/showVideos',{layout: 'admin.hbs',paths:movie.paths,movieId});
};

const create = async (req,res) =>{
    let categories = await Category.find();
    res.render('admin/movies/create',{layout:'admin.hbs',categories});
};

const remove = async (req,res) =>{
    let movieId = req.params.id;
    let movie  = await Movie.findById(movieId);
    let paths = movie.paths;
    for(path of paths){
        fs.unlinkSync(`public/movies/${path}`);
    }
    movie.remove();
    res.redirect('/admin/movies');
};

const deleteVideo = async (req,res) =>{
    let movieId = req.session.movieId? req.session.movieId : "";
    let videoPath  = req.params.path;
    let movie = await Movie.findById(movieId);
    let filteredPaths = movie.paths.filter((val,index,arr) => val !== videoPath);
    movie.paths = filteredPaths;
    fs.unlinkSync(`public/movies/${videoPath}`);
    await movie.save();
    req.session.movieId = null;
    res.redirect(`/admin/movies/showVideos/${movieId}`);
};

const updatePaths = async (req,res) =>{
    let movieId = req.params.id;
    let movie = await Movie.findById(movieId);
    let uploadedVideos = req.files.videos;
    let paths = uploads(res,'movies',uploadedVideos);
    paths.forEach((path) =>{
        movie.paths.push(path);
    });
    await movie.save();
    res.redirect(`/admin/movies/showVideos/${movieId}`);
};
const edit = async (req,res) =>{
    let movieId = req.params.id;
    let movie = await Movie.findById(movieId).populate('category');
    let categories = await Category.find();
    res.render('admin/movies/edit',{layout: 'admin.hbs',movie,categories});
};

const update = async (req,res) =>{
    let movieId = req.params.id;
    await Movie.findByIdAndUpdate(movieId,{$set : req.body});
    res.redirect('/admin/movies');
};

const store = async (req,res) =>{
    let paths;
    let photoPath;
    if(req.files.videos){
        paths =  uploads(res,'movies',req.files.videos);
    }
    if(req.files.photo){
         photoPath= uploads(res,'images',req.files.photo);
    }

    let movie = new Movie({
        title:req.body.title,
        releaseYear : req.body.releaseYear
        ,runningTime: req.body.runningTime ,
        country : req.body.country,
        category : req.body.category,
        description : req.body.description,
        photoPath: photoPath,
        paths : paths
    });

    await movie.save();
    res.redirect('/admin/movies');
};

module.exports = {create,store,index,show,remove,edit,update,updatePaths,deleteVideo};