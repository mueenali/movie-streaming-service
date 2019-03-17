let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/film').then(()=>{
    console.log('database connected');
}).catch((e)=>{
    console.log(e);
});

module.exports =mongoose;