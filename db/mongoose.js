let mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_CONECTION).then(()=>{
    console.log('database connected');
}).catch((e)=>{
    console.log(e);
});

module.exports =mongoose;