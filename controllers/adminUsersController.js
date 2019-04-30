const User = require('../models/user');
const Role = require('../models/role');
const controllerOperations = require('../utils/controllerOperations');

const index = (req,res) =>{
    controllerOperations.index(User,res,req,'role','admin/users/index');
};
const create = async (req,res) =>{
    try{
        let roles = await Role.find();
        res.render('admin/users/create' , {layout : 'admin.hbs', roles});
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/admin');
    }

};
const store = async (req,res) =>{
    controllerOperations.store(User,res,req,'/admin/users');
};

const edit = async (req,res) =>{
    let roles = await Role.find();
    controllerOperations.edit(User,roles,res,req,'admin/users/edit','/admin/users');
};
const update = async (req,res) =>{
    try{
        let userId = req.params.id;
        let user = await User.findById(userId).populate('role');
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.body.password !== '') {
            user.password = req.body.password;
        }
        user.role = req.body.role;
        await user.save();
        res.redirect('/admin/users');
    }catch(err){
        req.flash('error',err.message);
        res.redirect('back');
    }

};

const remove = async (req,res) =>{
    controllerOperations.remove(User,res,req,'/admin/users');
};

module.exports = {index,create,store,edit,update,remove};