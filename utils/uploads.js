const path = require('path');

const uploads =  (res,dir,uploads) => {
    uploads.mv(path.resolve(`./public/${dir}/${uploads.name}`), (error) => {
        if (error)
            res.render('error',{message:error.message,error});
    });
    return uploads.name;
};

module.exports = uploads;