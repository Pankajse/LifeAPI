const axios = require("axios");
const DonateBloodModel = require("../models/donateBlood.model");
const OrgModel = require("../models/org.model");

module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error("Origin and Destination are required");
    }
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        if (data.status === "OK") {
            if(data.rows[0].elements[0].status === "Zero_results"){
                throw new Error("Invalid Origin or Destination");
            }
            return data.rows[0].elements[0];
        } else {
            throw new Error("Error fetching data from Google Maps API");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports.getAutoSuggestions = async (input) => {
    if(!input){
        throw new Error("Input is required");
    }
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        if (data.status === "OK") {
            return data.predictions;
        } else {
            throw new Error("Error fetching data from Google Maps API");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports.getAddressCoordinates = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        if (data.status === "OK") {
            const location = data.results[0].geometry.location;
            return {
                ltd : location.lat,
                lng : location.lng
            }
        } else {
            throw new Error("Error fetching data from Google Maps API");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports.getAddressFromCoordinates = async (ltd, lng) => {
    if (!ltd || !lng) {
        throw new Error("Latitude and longitude are required");
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${ltd},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    
    try {
        const response = await axios.get(url);
        const data = response.data;
        
        if (data.status === "OK") {
            // Return the formatted address from the first result
            return data.results[0].formatted_address;
        } else {
            throw new Error("Error fetching data from Google Maps API: " + data.status);
        }
    } catch (error) {
        console.error("Error in getAddressFromCoordinates:", error);
        throw error;
    }
};


module.exports.getUsersInTheRadius = async (ltd, lng, radius) => {
    if(!ltd || !lng || !radius){
        throw new Error("Latitude, Longitude and Radius are required");
    }
    const users = await DonateBloodModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    }).populate('user');

    return users;
}

module.exports.getOrgsInTheRadius = async (ltd, lng, radius) => {
    if(!ltd || !lng || !radius){
        throw new Error("Latitude, Longitude and Radius are required");
    }
    const orgs = await OrgModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    }).populate('donateBlood');

    return orgs;
}