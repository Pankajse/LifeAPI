const express = require("express")
const router = express.Router();
const userController = require("../controllers/user.controller");
const validate = require("../middlewares/user.validation");
const { authUser } = require("../middlewares/auth.middleware");


router.post("/signup",validate.userRegisterValidationRules,userController.registerUser)

router.post("/signin",validate.userLoginValidationRules,userController.signinUser)

router.get("/me",authUser,userController.getUserProfile)

router.put("/updateProfile",authUser,validate.userUpdateValidationRules,userController.updateUserProfile)

router.delete("/deleteProfile",authUser,userController.deleteUserProfile)

router.post("/logout",authUser,userController.signoutUser)

module.exports = router