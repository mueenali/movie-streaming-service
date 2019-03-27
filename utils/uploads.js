const path = require('path');

const uploads =  (res,dir,uploads) => {
    if(uploads.constructor === Array){
        let paths = [];
        for(let i = 0; i<uploads.length; i++){
            paths.push(uploads[i].name);
            uploading(res,dir,uploads[i]);
        }
        return paths;
    }
     uploading(res,dir,uploads);
    return uploads.name;
};

const uploading = (res,dir,upload) =>{
    upload.mv(path.resolve(`./public/${dir}/${upload.name}`), (error) => {
        if (error)
            res.render('error',{message:error.message,error});
    });

};

module.exports = uploads;