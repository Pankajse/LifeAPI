const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    fullname : {
        type : String,
        required : true,
        minLength : [3,"Name should be more than 3 characters"]
    },
    email : {
        type : String,
        required : true,
        unique : true,
        minLength : [8,"Email should be more than 8 characters"]
    },
    password : {
        type : String,
        required : true,
        minLength : [8,"Password should be more than 8 characters"],
        select : false
    },
    socketId : {
        type : String
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id},"iloveme")
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async (password)=>{
    const hash = await bcrypt.hash(password,10);
    return hash;
}

const UserModel = mongoose.model("user",userSchema);

module.exports = UserModel;
