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
    for (let i = 0; i< movies.paths.length; i++){
        fs.unlinkSync(`public/movies/${movies.paths[i]}`);
    }
    movie.remove();
    res.redirect('/admin/movies');
};

const deleteVideo = async (req,res) =>{
    let movieId = req.session.movieId? req.session.movieId : "";
    let videoPath  = req.params.path;
    fs.unlinkSync(`public/movies/${videoPath}`);
    await Movie.findByIdAndUpdate(movieId,{$pull :{paths:{$in :[videoPath]}}});
    req.session.movieId = null;
    res.redirect(`/admin/movies/showVideos/${movieId}`);
};

const updatePaths = async (req,res) =>{
    let movieId = req.params.id;
    let uploadedVideos = req.files.videos;
    let paths = uploads(res,'movies',uploadedVideos);
    await Movie.findByIdAndUpdate(movieId,{$push:{paths}});
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
    let paths = req.files.videos ?  uploads(res,'movies',req.files.videos) : '';
    let photoPath = req.files.photo ? uploads(res,'images',req.files.photo) : '';
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