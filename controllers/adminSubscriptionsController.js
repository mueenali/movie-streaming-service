const Subscription = require('../models/subscription');

const index = async (req,res) =>{
    try{
        let subscriptions = await Subscription.find();
        res.render('admin/subscriptions/index',{layout: 'admin.hbs',subscriptions});
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/admin');
    }

};
const create = (req,res) =>{
    res.render('admin/subscriptions/create',{layout: 'admin.hbs'});
};

const store = async (req,res) =>{
    try{
        let subscription = new Subscription(req.body);
        await subscription.save();
        res.redirect('/admin/subscriptions');
    }catch(err){
        req.flash('error',err.message);
        res.redirect('back');
    }

};

const edit = async (req,res) =>{
    try{
        let subId = req.params.id;
        let subscription = await Subscription.findById(subId);
        res.render('admin/subscriptions/edit',{layout: 'admin.hbs',subscription});
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/admin/subscriptions');
    }

};

const update = async (req,res) =>{
    try{
        let subId = req.params.id;
        await Subscription.findByIdAndUpdate(subId,{$set : req.body});
        res.redirect('/admin/subscriptions');
    }catch(err){
        req.flash('error',err.message);
        res.redirect('back');
    }

};

const remove = async (req,res) =>{
    try{
        let subId = req.params.id;
        await Subscription.findByIdAndRemove(subId);
        res.redirect('/admin/subscriptions');
    }catch(err){
        req.flash('error',err.message);
        res.redirect('back');
    }

};
module.exports = {index,create,store,edit,update,remove};