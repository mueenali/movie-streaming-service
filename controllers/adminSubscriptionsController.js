const Subscription = require('../models/subscription');

const index = async (req,res) =>{
    let subscriptions = await Subscription.find();
    res.render('admin/subscriptions/index',{layout: 'admin.hbs',subscriptions});
};
const create = (req,res) =>{
    res.render('admin/subscriptions/create',{layout: 'admin.hbs'});
};

const store = async (req,res) =>{
    let subscription = new Subscription(req.body);
    await subscription.save();
    res.redirect('/admin/subscriptions');
};

const edit = async (req,res) =>{
  let subId = req.params.id;
  let subscription = await Subscription.findById(subId);
  res.render('admin/subscriptions/edit',{layout: 'admin.hbs',subscription});
};

const update = async (req,res) =>{
    let subId = req.params.id;
    await Subscription.findByIdAndUpdate(subId,{$set : req.body});
    res.redirect('/admin/subscriptions');
};

const remove = async (req,res) =>{
    let subId = req.params.id;
    await Subscription.findByIdAndRemove(subId);
    res.redirect('/admin/subscriptions');
};
module.exports = {index,create,store,edit,update,remove};