
const index = async (Model,res,req,populatedModel,des)=>{
    try{
        let result =  await Model.find().populate(populatedModel);
        res.render(des,{layout: 'admin.hbs',result,errors:req.flash('error')});
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/admin');
    }
};
const create = async (Model,res,req,des) =>{
    try{
        let result = await Model.find();
        res.render(des,{layout:'admin.hbs',result});
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/admin');
    }
};

const store = async (Model,res,req,des) =>{
    try{
        let model = new Model(req.body);
        await model.save();
        res.redirect(des);
    }catch(err){
        req.flash('error',err.message);
        res.redirect('back');
    }
};

const remove = async (Model,res,req,des) =>{
    try{
        await Model.findByIdAndRemove(req.params.id,{});
        res.redirect(des);
    }catch(err){
        req.flash('error',err.message);
        res.redirect('back');
    }
};

const update = async (Model,res,req,des) =>{
    try{
        await Model.findByIdAndUpdate(req.params.id,{$set : req.body});
        res.redirect(des);
    }catch(err){
        req.flash('error',err.message);
        res.redirect('back');
    }
};

const edit =async (Model,modelResult,res,req,des,errDes) =>{
    try{
        let result = await Model.findById(req.params.id);
        res.render(des,{layout:'admin.hbs',result,modelResult});
    }catch(err){
        req.flash('error',err.message);
        res.redirect(errDes);
    }
};

module.exports = {update,edit,remove,store,index,create};