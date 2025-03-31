const OrgModel = require("../models/org.model");
const { getAddressCoordinates } = require("./location.service");

module.exports.createOrg = async(orgName, email, password, address, orgType, contactNumber, registrationNumber) => {
    if (!orgName || !email || !password || !address || !orgType || !contactNumber) {
        throw new Error("All fields are required");
    }
    const hashPassword = await OrgModel.hashPassword(password);
    const location = await getAddressCoordinates(address);
    const orgData = { orgName, email, password: hashPassword, location, orgType, contactNumber };
    if (registrationNumber) {
        orgData.registrationNumber = registrationNumber;
    }
    const org = await OrgModel.create(orgData);
    return org;
}