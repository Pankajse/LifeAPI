const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestBloodSchema = new Schema({
    organization : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "organization"
    },
    bloodType : {
        type : String,
        required : true,
        enum : ["A+","B+","AB+","O+","A-","B-","AB-","O-"]
    },
    amount : {
        type : Number,
        required : true
    }
});

const RequestBloodOrgModel = mongoose.model("requestOrg",requestBloodSchema);

module.exports = RequestBloodOrgModel;