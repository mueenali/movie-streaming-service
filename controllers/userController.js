const User = require('../models/user');
const fs = require('fs');
const uploads = require('../utils/uploads');
const profile = async (req,res)=>{
    let userId = req.user;
    let user = await User.findById(userId);
    let csrfToken = req.csrfToken();
    res.render('user/profile',{user,csrfToken});
};

const editProfile = async (req,res)=>{
    let userId = req.user;
    let image = req.files.photo ? uploads(res,'images',req.files.photo):'';
    let user = await User.findById(userId);
    if(image !== ''){
        fs.unlinkSync(`public/images/${user.imagePath}`);
        user.imagePath=image;
    }
    user.name = req.body.name,user.email=req.body.email;
    await user.save();
    res.redirect('back');
};
module.exports = {profile,editProfile};