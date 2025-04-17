const { validationResult } = require("express-validator");
const UserModel = require("../models/user.model");
const { BlacklistTokenModel } = require("../models/blacklist.model");
const userService = require("../services/user.service");
const DonateBloodModel = require("../models/donateBlood.model");

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: "error in input",
            errors: errors.array()
        });
    }
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).json({
            msg: "User already exists"
        });
    }
    try {
        const { fullname, email, password} = req.body;
        const user = await userService.createUser( fullname, email, password);
        const token = await user.generateAuthToken();
        if(!user){
            return res.status(400).json({
                msg : "User not created"
            })
        }
        res.cookie("token", token);
        res.status(201).json({
            msg: "User created successfully",
            user: user,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error
        });
    }
}

module.exports.signinUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: "error in input",
            errors: errors.array()
        });
    }
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({email}).select("+password");
        if (!user) {
            return res.status(400).json({
                msg: "User not found"
            });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                msg: "Invalid password"
            });
        }
        const token = await user.generateAuthToken();
        res.cookie("token", token);
        res.status(200).json({
            msg: "User logged in successfully",
            user: user,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error
        });
    }
}

module.exports.getUserProfile = async (req, res) => {
    const user = req.user;
    res.status(200).json({
        msg: "User profile",
        user: user
    });
}


module.exports.updateUserProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: "Error in input",
            errors: errors.array(),
        });
    }

    const user = req.user;

    try {
        // ✅ Allow only specific fields to be updated
        const allowedFields = ["name", "email", "password", "age", "bloodType", "gender", "address", "phone"];
        const updateData = {};

        Object.keys(req.body).forEach((key) => {
            if (allowedFields.includes(key)) {
                updateData[key] = req.body[key];
            }
        });

        // ✅ Ensure at least one field is updated
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                msg: "No valid fields provided for update",
            });
        }

        // ✅ Update user with validation
        const updatedUser = await UserModel.findByIdAndUpdate(
            user._id,
            updateData,
            { new: true, runValidators: true } // ✅ Enforce Mongoose validation
        );

        if (!updatedUser) {
            return res.status(404).json({
                msg: "User not found",
            });
        }

        res.status(200).json({
            msg: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error.message,
        });
    }
};

module.exports.deleteUserProfile = async (req, res) => {
    const user = req.user;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(user._id);
        if (!deletedUser) {
            return res.status(404).json({
                msg: "User not found",
            });
        }
        res.clearCookie("token");
        res.status(200).json({
            msg: "User deleted successfully",
            user: deletedUser
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
}

module.exports.signoutUser = async (req, res) => {
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
            msg: "User logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
}

module.exports.isDonateFormSubmitted = async (req, res) => {
    const user = req.user;
    try {
        const response = await DonateBloodModel.findOne({ user: user._id });
        if (response) {
            return res.status(200).json({ 
                submitted: true, 
                form: response 
            });
        }
        return res.status(200).json({ 
            submitted: false,
            msg: 'form not submitted'
        });
    } catch (error) {
        return res.status(500).json({ 
            error: "Server error",
            details: error.message 
        });
    }
};