const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectID} = require('mongodb');
const commentSchema = new Schema({
    content :{
        type: String,
        required : true
    },
    date:{
        type: String,
        required: true
    },
    likes:{
        type:Number,

    },
    dislikes:{
        type:Number
    },
    user:{
        type:ObjectID,
        ref:'User',
        required:true
    },
});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;