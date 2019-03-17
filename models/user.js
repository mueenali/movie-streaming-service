let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const {ObjectID} = require('mongodb');
let userSchema = new Schema({
    name :{
        type: String,
        required : true
    },
    email : {
        type:String ,
        required : true,
        unique : true,
        trim : true,
    },
    password: {
        type: String,
        required: true,
    },
    imagePath :{
        type :String
    },
    role : {
        type : ObjectID,
        ref : 'Role'
    }
});

userSchema.pre('save', async function hashPassword(next) {
    try {
        const user = this;
        if (user.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            return next();
        }else {
            return next();
        }

    } catch (e) {
        return next(e);
    }
});

userSchema.methods.matchedPassword = function (password) {
    return bcrypt.compareSync(password,this.password);
};


const User = mongoose.model('User',userSchema);
module.exports = User;