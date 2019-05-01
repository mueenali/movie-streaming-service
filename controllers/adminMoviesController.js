const Movie = require('../models/movie');
const fs = require('fs');
const Category = require('../models/category');
const uploads = require('../utils/uploads');
const controllerOperations = require('../utils/controllerOperations');
const index = async (req,res) =>{
    controllerOperations.index(Movie,res,req,'category','admin/movies/index');
};

const create =  (req,res) =>{
    controllerOperations.create(Category,res,req,'admin/movies/create');
};

const store = async (req,res) =>{
    try{
        let movie720p = req.files.movie720p ?  uploads(res,'movies',req.files.movie720p) : null;
        let movie1080p = req.files.movie1080p ?  uploads(res,'movies',req.files.movie1080p) : null;
        let movie1440p = req.files.movie1440p ?  uploads(res,'movies',req.files.movie1440p) : null;
        let photoPath = req.files.photo ? uploads(res,'images',req.files.photo) : '';
        let movie = new Movie({
            title:req.body.title,
            releaseYear : req.body.releaseYear
            ,runningTime: req.body.runningTime ,
            country : req.body.country,
            category : req.body.category,
            description : req.body.description,
            photoPath: photoPath,
            paths: [
                {
                    name: 'movie720p',
                    path: movie720p
                },
                {
                    name: 'movie1080p',
                    path: movie1080p
                },
                {
                    name: 'movie1440p',
                    path: movie1440p
                }
            ]
        });
        await movie.save();
        res.redirect('/admin/movies');
    }catch(err){
        req.flash('error',err.message);
        res.redirect('back');
    }

};

const show = async (req,res) =>{
    try{
        let movieId = req.params.id;
        let movie = await Movie.findById(movieId);
        req.session.movieId = movieId;
        res.render('admin/movies/showVideos',{layout: 'admin.hbs',paths:movie.paths,movie,movieId});
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/admin/movies');
    }

};

const remove = async (req,res) => {
    try {
        let movieId = req.params.id;
        let movie = await Movie.findById(movieId);
        for (let i = 0; i < movie.paths.length; i++) {
            fs.unlinkSync(`public/movies/${movie.paths[i]}`);
        }
        movie.remove();
        res.redirect('/admin/movies');
    } catch (err) {
        req.flash('error',err.message);
        res.redirect('back');
    }
};


const deleteVideo = async (req,res) =>{
    try{
        let movieId = req.session.movieId? req.session.movieId : "";
        let name = req.body.name;
        let path = req.params.path;
        fs.unlinkSync(`public/movies/${path}`);
        await Movie.update({_id:movieId,'paths.name':name},{$set:{"paths.$.path":null}});
        req.session.movieId = null;
        res.redirect(`/admin/movies/showVideos/${movieId}`);
    }catch(err){
        req.flash('error',err.message);
        res.redirect('back');
    }

};

const updatePaths = async (req,res) =>{
    try{
        let movieId = req.params.id;
        let video = req.files.movie;
        let res = req.body.movieRes;
        let path = uploads(res,'movies',video);
        await Movie.update({_id:movieId,'paths.name':res},{$set:{"paths.$.path":path}});
        res.redirect(`/admin/movies/showVideos/${movieId}`);
    }catch(err){
        req.flash('error',err.message);
        res.redirect('back');
    }

};
const edit = async (req,res) =>{
    let categories = await Category.find();
    controllerOperations.edit(Movie,categories,res,req,'admin/movies/edit','/admin/movies','category');
};

const update =  (req,res) =>{
    controllerOperations.update(Movie,res,req,'/admin/movies');
};

module.exports = {create,store,index,show,remove,edit,update,updatePaths,deleteVideo};