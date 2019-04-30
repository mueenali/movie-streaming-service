const Subscription = require('../models/subscription');
const controllerOperations = require('../utils/controllerOperations');
const index =  (req,res) =>{
    controllerOperations.index(Subscription,res,req,'','admin/subscriptions/index');
};
const create = (req,res) =>{
    res.render('admin/subscriptions/create',{layout: 'admin.hbs'});
};

const store = async (req,res) =>{
    controllerOperations.store(Subscription,res,req,'/admin/subscriptions');
};

const edit = async (req,res) =>{
    controllerOperations.edit(Subscription,{},res,req,'admin/subscriptions/edit', '/admin/subscriptions');
};

const update =  (req,res) =>{
    controllerOperations.update(Subscription,res,req,'/admin/subscriptions');
};

const remove = async (req,res) =>{
    controllerOperations.remove(Subscription,res,req,'/admin/subscriptions');
};
module.exports = {index,create,store,edit,update,remove};