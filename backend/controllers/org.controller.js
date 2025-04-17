const { validationResult } = require("express-validator");
const OrgModel  = require("../models/org.model");
const { BlacklistTokenModel } = require("../models/blacklist.model");
const orgService = require("../services/org.service");
const BloodStockModel = require("../models/bloodStock.model");
const BloodDonationOrgModel = require("../models/donateBloodOrg.model");
const RequestBloodOrgModel = require("../models/requestBloodOrg.model");
const bloodServices = require("../services/blood.service");

module.exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: "error in input",
            errors: errors.array()
        });
    }
    const existingOrg = await OrgModel.findOne({ email: req.body.email });
    if (existingOrg) {
        return res.status(400).json({
            msg: "Organization already exists"
        });
    }
    try {
        const { orgName, email, password, address, orgType, contactNumber, registrationNumber } = req.body;
        const org = await orgService.createOrg(orgName, email, password, address, orgType, contactNumber, registrationNumber);
        if (!org) {
            return res.status(400).json({
                msg: "Organization not created"
            });
        }
        const bloodStock = await BloodStockModel.create({
            organization : org._id,
        });
        const donation = await BloodDonationOrgModel.create({
            organization : org._id
        });
        await OrgModel.findByIdAndUpdate(org._id,{
            donateBlood : donation._id,
            bloodStock : bloodStock._id
        });
        const token = await org.generateAuthToken();
        res.cookie("token", token);
        res.status(201).json({
            msg: "Organization created successfully",
            org: org,
            token: token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error",
            error: error
        });
    }
};

module.exports.signin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: "error in input",
            errors: errors.array()
        });
    }
    try {
        const { email, password } = req.body;
        const org = await OrgModel.findOne({ email }).select("+password");
        if (!org) {
            return res.status(400).json({
                msg: "Organization not found"
            });
        }
        const isMatch = await org.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                msg: "Invalid password"
            });
        }
        const token = await org.generateAuthToken();
        res.cookie("token", token);
        res.status(200).json({
            msg: "Organization logged in successfully",
            org: org,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error
        });
    }
};


module.exports.getProfile = async (req, res) => {
    try {
      const org = req.org;
  
      const stock = await BloodStockModel.findOne({ organization: org._id });
  
      if (!stock) {
        return res.status(404).json({ msg: "Blood stock not found for this organization" });
      }
  
      // Calculate total units across all blood groups
      const totalUnits = Object.entries(stock.toObject())
        .filter(([key]) => ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(key))
        .reduce((sum, [_, value]) => sum + value, 0);
  
      res.status(200).json({
        msg: "Organization profile",
        org,
        totalUnits
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Error fetching profile", error: error.message });
    }
  };
  

module.exports.signout = async (req, res) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) {
        return res.status(401).json({
            msg: "Unauthorized access"
        });
    }
    try {
        const blacklistToken = await BlacklistTokenModel.create({ token });
        res.clearCookie("token");
        res.status(200).json({
            msg: "Organization logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
};

module.exports.delete = async (req, res) => {
    const org = req.org;
    try {
        const deletedOrg = await OrgModel.findByIdAndDelete(org._id);
        if (!deletedOrg) {
            return res.status(404).json({
                msg: "Organization not found",
            });
        }
        res.clearCookie("token");
        res.status(200).json({
            msg: "Organization deleted successfully",
            org: deletedOrg
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
};

module.exports.bloodStock= async(req,res)=>{
    const org = req.org;
    try {
        const bloodStock = await BloodStockModel.findOne({
            organization : org._id
        })
        if(!bloodStock){
            return res.status(400).json({msg : "Blood Stock not found"});
        }
        const bloodStoc = {
            "A+" : bloodStock["A+"],
            "B+" : bloodStock["B+"],
            "AB+" : bloodStock["AB+"],
            "O+" : bloodStock["O+"],
            "A-" : bloodStock["A-"],
            "B-" : bloodStock["B-"],
            "AB-" : bloodStock["AB-"],
            "O-" : bloodStock["O-"],
        }
        return res.status(200).json({msg : "Blood Stock ",bloodStock:bloodStoc});
    } catch (error) {
        return res.status(400).json({msg : "Error fetching Blood Stock",error});
    }
}

module.exports.bloodStockUpdate = async (req, res) => {
    const org = req.org;
  
    try {
      const { bloodType, units, action } = req.body;
  
      // Update blood stock
      const updatedStock = await BloodStockModel.updateStock(org._id, bloodType, units, action);
      if (!updatedStock) {
        return res.status(400).json({ msg: "Blood Stock not updated" });
      }
  
      // Get the donation stock for this organization
      const donationStock = await BloodDonationOrgModel.findOne({ organization: org._id });
  
      if (donationStock && donationStock.bloodGroups[bloodType] > updatedStock[bloodType]) {
        // Update only that blood group to match updated stock
        await BloodDonationOrgModel.findOneAndUpdate(
          { organization: org._id },
          { $set: { [`bloodGroups.${bloodType}`]: updatedStock[bloodType] } }
        );
      }
  
      return res.status(200).json({ msg: "Blood Stock updated", updatedStock });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Error updating Blood Stock", error: error.message });
    }
  };
  

module.exports.donateBloodOrg = async (req, res) => {
    const org = req.org;
    try {
        const { bloodGroups } = req.body;
        
        // Calculate total units
        const totalUnits = Object.values(bloodGroups).reduce((sum, units) => sum + units, 0);
        
        // Create or update the donation record
        const response = await BloodDonationOrgModel.findOneAndUpdate(
            { organization: org._id },
            {
                bloodGroups: {
                    'A+': bloodGroups['A+'] || 0,
                    'A-': bloodGroups['A-'] || 0,
                    'B+': bloodGroups['B+'] || 0,
                    'B-': bloodGroups['B-'] || 0,
                    'AB+': bloodGroups['AB+'] || 0,
                    'AB-': bloodGroups['AB-'] || 0,
                    'O+': bloodGroups['O+'] || 0,
                    'O-': bloodGroups['O-'] || 0
                },
                totalUnits
            },
            {
                new: true,
                upsert: true, // Create a new document if one doesn't exist
                runValidators: true // Ensure validations are run
            }
        );

        return res.status(200).json({ 
            msg: "Submitted Successfully",
            donation: response 
        });
    } catch (error) {
        console.error("Donation error:", error);
        return res.status(400).json({ 
            msg: "Failed to submit donation",
            error: error
        });
    }
};

module.exports.getDonateBloodOrg = async(req, res) => {
    const org = req.org;
    try {
        const donation = await BloodDonationOrgModel.findOne({organization: org._id});
        
        // Return empty object if no donation exists (instead of error)
        if (!donation) {
            return res.status(200).json({ 
                msg: "No donation record found",
                donation: {
                    bloodGroups: {
                        'A+': 0,
                        'A-': 0,
                        'B+': 0,
                        'B-': 0,
                        'AB+': 0,
                        'AB-': 0,
                        'O+': 0,
                        'O-': 0
                    },
                    totalUnits: 0
                }
            });
        }
        
        return res.status(200).json({ 
            msg: "Donation data retrieved successfully",
            donation  // Fixed: returning 'donation' instead of undefined 'response'
        });
    } catch (error) {
        console.error("Error getting donation stock:", error);
        return res.status(400).json({ 
            msg: "Failed to get donation stock",
            error: error.message  // Better to send just the message
        });
    }
}

module.exports.requestBloodformOrg = async(req,res)=>{
    try{
        const org = req.org;
        const {bloodType,amount} = req.body;
        const requestForm = await bloodServices.requestBloodFormOrg({org : org._id,bloodType,amount});
        if(!requestForm){
            return res.status(400).json({message : "Request blood form not submited"})
        }

        return res.status(200).json({message : "Request blood form Submitted", requestForm})
    }catch(error){
        console.log(error)
        return res.status(500).json({message : "Internal Server Error",error});
    }
}

module.exports.nearbydonorsOrgsByBloodType = async (req, res) => {
    const org = req.org;
    try {
        const requestBloodForm = await RequestBloodOrgModel.findOne({ organization : org._id });
        if (!requestBloodForm) {
            return res.status(400).json({ message: "Request blood form not found" });
        }
        const bloodType = requestBloodForm.bloodType;
        const nearbyDonors = await bloodServices.nearbyDonorsByBloodType(org.location, bloodType);
        const nearbyOrgs = await bloodServices.nearbyOrgsByBloodType(org.location, bloodType);
         // Transform donors data
         const transformedDonors = nearbyDonors.map(donor => ({
            _id: donor.user._id,
            name: donor.user.fullname,
            type: 'user',
            distance: donor.distance,
            duration: donor.duration,
            bloodGroup: donor.bloodType,
            units: null, // Empty for users
            contact: donor.contact,
            availability: donor.availability.date,
            weight: donor.weight,
            age: donor.age,
            location: donor.location,
            email: donor.user.email
        }));

        // Transform organizations data
        const transformedOrgs = nearbyOrgs.map(org => ({
            _id: org._id,
            name: org.orgName,
            type: org.orgType,
            distance: org.distance,
            duration: org.duration,
            bloodGroup: null, // Empty for organizations (since they have multiple)
            units: org.donateBlood.totalUnits,
            contact: org.contactNumber,
            availability: null, // Empty for organizations
            weight: null, // Empty for organizations
            age: null, // Empty for organizations
            location: org.location,
            email: org.email,
            bloodStock: org.donateBlood.bloodGroups // Include full blood stock details
        }));

        // Combine results
        const results = [...transformedDonors, ...transformedOrgs];

        return res.status(200).json({ 
            message: "Nearby donors and organizations found", 
            results 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};