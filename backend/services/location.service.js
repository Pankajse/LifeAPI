const axios = require("axios");

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