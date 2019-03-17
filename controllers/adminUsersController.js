const User = require('../models/user');
const Role = require('../models/role');
const _ = require('lodash');

const index =async (req,res) =>{
    let users = await User.find().populate('role');
    res.render('admin/users/index',{layout: 'admin.hbs', users});
};

const create = async (req,res) =>{
    let roles = await Role.find();
    res.render('admin/users/create' , {layout : 'admin.hbs', roles});
};
const store = async (req,res) =>{
    let body = _.pick(req.body,['name','email','password','role']);
    let user = new User(body);
    await user.save();
    res.redirect('/admin/users');
};

const edit = async (req,res) =>{
    let userId = req.params.id;
    let user = await User.findById(userId);
    let roles = await Role.find();
    res.render('admin/users/edit',{layout:'admin.hbs',user,roles});
};

const update = async (req,res) =>{
    let userId = req.params.id;
    let body = _.pick(req.body,['name','email','password','role']);
    let user = await User.findByIdAndUpdate(userId,{$set : body});
    await user.save();
    res.redirect('/admin/users');
};

const remove = async (req,res) =>{
    let userId= req.params.id;
    await User.findByIdAndRemove(userId);
    res.redirect('/admin/users');
};

module.exports = {index,create,store,edit,update,remove};