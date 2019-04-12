let mongoose = require('mongoose');
let slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
let Schema = mongoose.Schema;
let categorySchema = new Schema({
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