const Movie = require('../models/movie');
const _ = require('lodash');

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
    res.render('admin/movies/showVideos',{layout: 'admin.hbs',movie});
};

const create = async (req,res) =>{
    let categories = await Category.find();
    res.render('admin/movies/create',{layout:'admin.hbs',categories});
};

const remove = async (req,res) =>{
    let movieId = req.params.id;
    let movie  = await Movie.findById(movieId);
    let paths = movie.paths;
    paths.forEach((path) =>{
        fs.unlinkSync(`public/movies/${path}`);
    });
    movie.remove();
    res.redirect('/admin/movies');
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
    let body = _.pick(req.body,['title','releaseYear','runningTime','country','category','description']);
    await Movie.findByIdAndUpdate(movieId,{$set : body});
    res.redirect('/admin/movies');
};

const store = async (req,res) =>{
    let body = _.pick(req.body,['title','releaseYear','runningTime','country','category','description']);
    let paths;
    if(req.files.videos){
        let uploadedVideos = req.files.videos;
        paths = uploads(res,'movies',uploadedVideos);
    }
    let movie = new Movie({
        title:body.title,
        releaseYear : body.releaseYear
        ,runningTime: body.runningTime ,
        country : body.country,
        category : body.category,
        description : body.description,
        paths : paths
    });

    await movie.save();
    res.redirect('/admin/movies');
};

module.exports = {create,store,index,show,remove,edit,update,updatePaths};