
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const blacklistTokenSchema = new Schema({
    token : {
        type : String,
        required : true,
        unique : true
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 86400
    }
})

const BlacklistTokenModel = mongoose.model("BlacklistToken",blacklistTokenSchema);

module.exports = {
    BlacklistTokenModel
};