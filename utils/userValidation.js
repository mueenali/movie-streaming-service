
let validation = (req) =>{
    let errors = req.validationErrors();
    if (errors) {
        let messages = [];
        for (let i = 0; i<errors.length; i++){
            messages.push(errors[i].msg);
        }
        req.flash('error', messages);
       return true;
    }
};

module.exports = validation;