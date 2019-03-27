const User = require('../models/user');
const Role = require('../models/role');

const index =async (req,res) =>{
    let users = await User.find().populate('role');
    res.render('admin/users/index',{layout: 'admin.hbs', users});
};

const create = async (req,res) =>{
    let roles = await Role.find();
    res.render('admin/users/create' , {layout : 'admin.hbs', roles});
};
const store = async (req,res) =>{
    let user = new User(req.body);
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
    }catch(error){
        req.flash('error',error.message);
        res.redirect('back');
    }

};

const remove = async (req,res) =>{
    let userId= req.params.id;
    await User.findByIdAndRemove(userId);
    res.redirect('/admin/users');
};

module.exports = {index,create,store,edit,update,remove};