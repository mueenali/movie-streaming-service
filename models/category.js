let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let categorySchema = new Schema({
    name :{
        type: String,
        unique : true,
        required : true
    },
});


const Category = mongoose.model('Category',categorySchema);
module.exports = Category;