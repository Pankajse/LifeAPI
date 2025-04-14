// const jwt = require('jsonwebtoken');
// const { BlacklistTokenModel } = require('../models/blacklist.model');
// const { UserModel } = require('../models/user.model');
// const OrgModel = require("../models/org.model");

// module.exports.authUser = async (req, res, next) => {
//     const token =
//         req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

//     if (!token) {
//         return res.status(401).json({ msg: "Unauthorized access" });
//     }
//     try {
//         const blacklistToken = await BlacklistTokenModel.findOne({ token });
//         if (blacklistToken) {
//             return res.status(401).json({ msg: "Unauthorized access" });
//         }


//         const decoded = jwt.verify(token, "iloveme");
//         const user = await UserModel.findById(decoded._id);

//         if (!user) {
//             return res.status(401).json({ msg: "Unauthorized access" });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         return res.status(401).json({ msg: "Unauthorized access" });
//     }
// };

// module.exports.authOrg = async (req, res, next) => {
//     const token =
//         req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

//     if (!token) {
//         return res.status(401).json({ msg: "Unauthorized access" });
//     }
//     try {
//         const blacklistToken = await BlacklistTokenModel.findOne({ token });
//         if (blacklistToken) {
//             return res.status(401).json({ msg: "Unauthorized access" });
//         }


//         const decoded = jwt.verify(token, "iloveme");
//         const org = await OrgModel.findById(decoded._id);

//         if (!org) {
//             return res.status(401).json({ msg: "Unauthorized access" });
//         }

//         req.org = org;
//         next();
//     } catch (error) {
//         return res.status(401).json({ msg: "Unauthorized access" });
//     }
// };

const jwt = require('jsonwebtoken');
const { BlacklistTokenModel } = require('../models/blacklist.model');
const { UserModel } = require('../models/user.model');
const OrgModel = require("../models/org.model");

module.exports.auth = async (req, res, next) => {
    const token =
        req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
        return res.status(401).json({ msg: "Unauthorized access" });
    }

    try {
        // Check if token is blacklisted
        const blacklistToken = await BlacklistTokenModel.findOne({ token });
        if (blacklistToken) {
            return res.status(401).json({ msg: "Unauthorized access" });
        }

        // Verify and decode token
        const decoded = jwt.verify(token, "iloveme");

        // Try to find user first
        const user = await UserModel.findById(decoded._id);
        if (user) {
            req.user = user;
            return next();
        }

        // If no user found, try to find organization
        const org = await OrgModel.findById(decoded._id);
        if (org) {
            req.org = org;
            return next();
        }

        // If neither found, return unauthorized
        return res.status(401).json({ msg: "Unauthorized access" });

    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized access" });
    }
};