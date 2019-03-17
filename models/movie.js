let mongoose = require('mongoose');
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
    subtitlePath :{
        type : String,
    },
    paths: {
        type : Array,
        required : true
    }
});

const Movie = mongoose.model('Movie',movieSchema);
module.exports = Movie;