const path = require('path');
const uploads = (res,dir,uploads) => {
    let paths = [];
    uploads.forEach((upload) =>{
        paths.push(upload.name);
        upload.mv(path.resolve(`./public/${dir}/${upload.name}`), (err) => {
            if (err)
                return res.status(500).send(err);
        });
    });
    return paths;
};

module.exports = uploads;