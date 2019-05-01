const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subscriptionSchema = new Schema({
    type :{
        type: String,
        unique : true,
        required : true
    },
    duration : {
        type : String,
        required: true
    },
    price : {
      type : Number,
      required : true
    },
    availability : {
        type : String,
        required : true
    },
    support: {
        type : String,
        required : true
    }
});

const Subscription = mongoose.model('Subscription',subscriptionSchema);
module.exports = Subscription;