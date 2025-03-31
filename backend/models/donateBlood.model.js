const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const donateBloodSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    bloodType : {
        type : String,
        enum : ["A+","B+","O+","AB+","A-","B-","O-","AB-"],
        required : true
    },
    healthStatus : {
        type : String,
        default : "good",
        maxLength : [30,"City length should be less than 30 words"]
    },
    location : {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    },
    availability : {
        date : {
            type : Date,
            required : true,
            expires: 0
        },
        city : {
            type : String,
            required : true,
            maxLength : [30,"City length should be less than 30 words"]
        }
    },
    contact : {
        type: String,
        required: true,
        minLength: [10, "Contact number should be at least 10 digits"]
    },
    weight : {
        type : Number,
        required : true
    },
    age : {
        type : Number,
        required : true,
        min : [18,"Age should be more than 18 to donate blood"]
    }
});

const DonateBloodModel = mongoose.model("donate",donateBloodSchema);

module.exports = DonateBloodModel;