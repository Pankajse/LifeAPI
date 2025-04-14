const express = require("express")
const router = express.Router();
const userController = require("../controllers/user.controller");
const validate = require("../middlewares/user.validation");
const { auth } = require("../middlewares/auth.middleware");


router.post("/signup",validate.userRegisterValidationRules,userController.registerUser)

router.post("/signin",validate.userLoginValidationRules,userController.signinUser)

router.get("/me",auth,userController.getUserProfile)

router.put("/updateProfile",auth,validate.userUpdateValidationRules,userController.updateUserProfile)

router.delete("/deleteProfile",auth,userController.deleteUserProfile)

router.post("/logout",auth,userController.signoutUser)

router.get("/is-donate-form-submitted",auth,userController.isDonateFormSubmitted)

module.exports = router