const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestBloodSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "user"
    },
    bloodType : {
        type : String,
        required : true,
        enum : ["A+","B+","AB+","O+","A-","B-","AB-","O-"]
    },
    amount : {
        type : Number,
        required : true
    },
    location : {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    },
    contact : {
        type : Number,
        required : true,
        minLength : [10,"Mobile number should be more than 10 digits"]
    },
    cause : {
        type : String,
        required : true,
        maxLength : [80, "Maximum Length is 80"]
    },
    status : {
        type : Boolean,
        required : true
    }
});

const RequestBloodModel = mongoose.model("request",requestBloodSchema);

module.exports = RequestBloodModel;