const DonateBloodModel = require("../models/donateBlood.model");
const RequestBloodModel = require("../models/requestBlood.model");
const RequestBloodOrgModel = require("../models/requestBloodOrg.model");
const { getAddressCoordinates,getUsersInTheRadius,getOrgsInTheRadius, getDistanceTime } = require("./location.service");

const donateBloodForm = async({user,bloodType,healthStatus,contactNumber,homeAddress,availability,weight,age})=>{
    if(!user || !bloodType || !availability || !weight || !age || !homeAddress || !contactNumber){
        throw new Error("All fields are Required");
    }

    const location = await getAddressCoordinates(homeAddress);
        const donateBloodResponse = await DonateBloodModel.create({
            user,
            bloodType,
            healthStatus,
            location,
            contact : contactNumber,
            availability,
            weight,
            age
        });
        return donateBloodResponse;
}

const requestBloodForm = async ({user,bloodType,amount,address,contact,cause,status})=>{
    if(!user || !bloodType || !amount || !address || !contact || !cause || status === undefined){
        throw new Error("All Fields are required");
    }
    await RequestBloodModel.findOneAndDelete({user});
    const location = await getAddressCoordinates(address);

    const requestBloodResponse = await RequestBloodModel.create({
        user,
        bloodType,
        amount,
        location,
        contact,
        cause,
        status
    });
    return requestBloodResponse
}

const requestBloodFormOrg = async ({org,bloodType,amount}) =>{
    if(!org || !bloodType || !amount){
        throw new Error("All Fields are required");
    }
    const response = await RequestBloodOrgModel.create({
        organization : org,
        bloodType,amount
    });
    return response;
}

const findRequestIdByUserId = async (userId) => {
    const request = await RequestBloodModel.findOne({ user : userId });
    return request ? request._id : null;
}

const updateRequestBloodForm = async (requestId, updateData) => {
    if (!requestId || !updateData) {
        throw new Error("Request ID and update data are required");
    }
    const updatedRequest = await RequestBloodModel.findByIdAndUpdate(requestId, updateData, { new: true });
    return updatedRequest;
}

const deleteRequestBloodForm = async(userId)=>{
    const response = await RequestBloodModel.deleteMany({ user : userId });
    return response;
}

const deleteDonateBloodForm = async(userId)=>{
    const response = await DonateBloodModel.deleteMany({user : userId})
    return response;
}



const nearbyDonorsByBloodType = async (location, bloodType) => {
    const users = await getUsersInTheRadius(location.ltd, location.lng, 30);
    const filteredUsers = users.filter(user => user.bloodType === bloodType);
    const updatedUsers = await Promise.all(filteredUsers.map(async (user) => {
        const distanceData = await getDistanceTime(
            `${location.ltd},${location.lng}`,
            `${user.location.ltd},${user.location.lng}`
        );
        return {
            ...user.toObject(),
            distance: distanceData.distance.text,
            duration: distanceData.duration.text
        };
    }));
    return updatedUsers;
};

const nearbyOrgsByBloodType = async (location, bloodType) => {
    const orgs = await getOrgsInTheRadius(location.ltd, location.lng, 30);
    const filteredOrgs = orgs.filter(org => 
        org.donateBlood && 
        org.donateBlood.bloodGroups && 
        org.donateBlood.bloodGroups[bloodType] > 0
    );
    const updatedOrgs = await Promise.all(filteredOrgs.map(async (org) => {
        const distanceData = await getDistanceTime(
            `${location.ltd},${location.lng}`,
            `${org.location.ltd},${org.location.lng}`
        );
        return {
            ...org.toObject(),
            distance: distanceData.distance.text,
            duration: distanceData.duration.text
        };
    }));
    return updatedOrgs;
};

module.exports = { 
    donateBloodForm, 
    requestBloodForm, 
    updateRequestBloodForm, 
    findRequestIdByUserId, 
    deleteRequestBloodForm, 
    deleteDonateBloodForm,
    nearbyDonorsByBloodType, 
    nearbyOrgsByBloodType,
    requestBloodFormOrg
};