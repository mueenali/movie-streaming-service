const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name :{
        type: String,
        unique : true,
        required : true
    },
    slug: {
        type: String,
        slug: "name",
        unique: true
    }
});


const Category = mongoose.model('Category',categorySchema);
module.exports = Category;