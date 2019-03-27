const Category = require('../models/category');
const index = async (req,res) =>{
    let categories =  await Category.find();
    res.render('admin/categories/index',{layout: 'admin.hbs',categories});
};

const create = (req,res) =>{
    res.render('admin/categories/create',{layout:'admin.hbs'});
};

const store = async (req,res) =>{
    let categoryName = req.body.name;
    let category = new Category({name:categoryName});
    await category.save();
    res.redirect('/admin/categories');
};

const remove = async (req,res) =>{
    let categoryId = req.params.id;
    await Category.findByIdAndRemove(categoryId);
    res.redirect('/admin/categories');
};

const edit = async (req,res) =>{
    let categoryId = req.params.id;
    let category = await Category.findById(categoryId);
    res.render('admin/categories/edit',{layout: 'admin.hbs',category});
};

const update = async (req,res) =>{
    let categoryId = req.params.id;
    let name = req.body.name;
    await Category.findByIdAndUpdate(categoryId,{name});
    res.redirect('/admin/categories');
};
module.exports = {index,create,store,remove,edit,update};