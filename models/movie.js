let mongoose = require('mongoose');
let slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
let Schema = mongoose.Schema;
const {ObjectID} = require('mongodb');
let movieSchema = new Schema({
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
    paths: {
        type : Object,
        required : true
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
});

const Movie = mongoose.model('Movie',movieSchema);
module.exports = Movie;