const index = async (req,res) =>{
    res.render('admin/index',{layout: 'admin.hbs'});
};

module.exports = {index};