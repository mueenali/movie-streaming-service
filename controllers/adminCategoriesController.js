const Category = require('../models/category');
const controllerOperations = require('../utils/controllerOperations');
const index =  (req,res) =>{
    controllerOperations.index(Category,res,req,'','admin/categories/index');
};

const create = (req,res) =>{
    res.render('admin/categories/create',{layout:'admin.hbs'});
};

const store = async (req,res) =>{
    controllerOperations.store(Category,res,req,'/admin/categories');
};

const remove = async (req,res) =>{
    controllerOperations.remove(Category,res,req,'/admin/categories');
};

const edit = async (req,res) =>{
    controllerOperations.edit(Category,{},res,req,'admin/categories/edit', '/admin/categories')
};

const update =  (req,res) =>{
    controllerOperations.update(Category,res,req,'/admin/categories',);
};
module.exports = {index,create,store,remove,edit,update};