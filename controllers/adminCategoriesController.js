const Category = require('../models/category');
const index = async (req,res) =>{
    try{
        let categories =  await Category.find();
        res.render('admin/categories/index',{layout: 'admin.hbs',categories,errors:req.flash('error')});
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/admin');
    }

};

const create = (req,res) =>{
    res.render('admin/categories/create',{layout:'admin.hbs'});
};

const store = async (req,res) =>{
    try{
        let categoryName = req.body.name;
        let category = new Category({name:categoryName});
        await category.save();
        res.redirect('/admin/categories');
    }catch(err){
        req.flash('error',err.message);
        res.redirect('back');
    }

};

const remove = async (req,res) =>{
    try{
        let categoryId = req.params.id;
        await Category.findByIdAndRemove(categoryId);
        res.redirect('/admin/categories');
    }catch(err){
        req.flash('error',err.message);
        res.redirect('back');
    }

};

const edit = async (req,res) =>{
    try{
        let categoryId = req.params.id;
        let category = await Category.findById(categoryId);
        res.render('admin/categories/edit',{layout: 'admin.hbs',category});
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/admin/categories');
    }

};

const update = async (req,res) =>{
    try{
        let categoryId = req.params.id;
        let name = req.body.name;
        await Category.findByIdAndUpdate(categoryId,{name});
        res.redirect('/admin/categories');
    }catch(err){
        req.flash('error',err.message);
        res.redirect('back');
    }

};
module.exports = {index,create,store,remove,edit,update};