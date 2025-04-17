const UserModel = require("../models/user.model")

module.exports.createUser = async(name,email,password)=>{
    if(!name || !email || !password){
        throw new Error("All fields are required");
    }
    const hashPassword = await UserModel.hashPassword(password);
        const user = await UserModel.create({
            fullname : name,
            email : email,
            password : hashPassword,
        })
        return user;
}