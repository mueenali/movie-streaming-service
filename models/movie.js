const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const {ObjectID} = require('mongodb');
const movieSchema = new Schema({
    title :{
        type: String,
        required : true
    },
    releaseYear : {
        type : Number,
        required: true
    },

    runningTime : {
        type : String,
        required : true
    },
    country :{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category:{
      type : ObjectID,
        required: true,
        ref: 'Category'
    },
    photoPath:{
      type: String,
      required:true
    },
    subtitlePaths :{
        type : Object,
    },
    paths:{
        type:Array,
        required:true
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
});

const Movie = mongoose.model('Movie',movieSchema);
module.exports = Movie;