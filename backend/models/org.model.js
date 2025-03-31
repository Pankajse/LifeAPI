const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const orgSchema = new Schema({
    orgName: {
        type: String,
        required: true,
        minLength: [3, "Organization name should be more than 3 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [8, "Email should be more than 8 characters"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password should be more than 8 characters"],
        select : false
    },
    location : {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    },
    orgType: {
        type: String,
        required: true,
        enum: ["bloodbank", "hospital", "ngo"]
    },
    contactNumber: {
        type: String,
        required: true,
        minLength: [10, "Contact number should be at least 10 digits"]
    },
    registrationNumber: {
        type: String
    },
    bloodStock : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'BloodStock'
    },
    donateBlood : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'BloodDonationOrg'
    },
    socketId : {
        type : String
    }
});

orgSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, "iloveme");
    return token;
};

orgSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

orgSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};


orgSchema.statics.hashPassword = async (password)=>{
    const hash = await bcrypt.hash(password,10);
    return hash;
}

const OrgModel = mongoose.model("organization", orgSchema);

module.exports = OrgModel;
