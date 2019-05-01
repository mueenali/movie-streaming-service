const Comment = require('../models/comment');
const moment = require('moment');

const createComment = async (req,res) =>{
    let comment = new Comment({
        content:req.body.content,
        user: req.user,
        date: moment().format('LLL')
    });
    await comment.save();
    res.redirect('back');
};

const deleteComment = async (req,res) =>{

};


const addReview = (req,res) =>{

};
const deleteReview = (req,res) =>{

};

const calculateRating = (req,res) =>{

};


module.exports = {createComment};