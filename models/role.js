let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let roleSchema = new Schema({
    name :{
        type: String,
        required : true
    },
});

const Role = mongoose.model('Role',roleSchema);
module.exports = Role;