
let validation = (req) =>{
    let errors = req.validationErrors();
    if (errors) {
        let messages = [];
        errors.forEach((error) => {
            messages.push(error.msg);
        });
        req.flash('error', messages);
       return true;
    }
};

module.exports = validation;