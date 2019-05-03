const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectID} = require('mongodb');
const reviewSchema = new Schema({
    title :{
        type: String,
        required : true
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type: String,
        required: true
    },
    user:{
        type:ObjectID,
        ref:'User',
        required:true
    },
    movie:{
        type:ObjectID,
        ref:'Movie',
        required:true
    }

});

const Review = mongoose.model('Review',reviewSchema);
module.exports = Review;