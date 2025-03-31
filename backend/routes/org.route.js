const express = require("express");
const router = express.Router();
const { authOrg } = require("../middlewares/auth.middleware");
const orgController = require("../controllers/org.controller");
const validate = require("../middlewares/user.validation");

router.post("/signup", validate.orgRegistrationValidationRules, orgController.signup);
router.post("/signin", validate.orgSigninValidationRules, orgController.signin);
router.get("/me", authOrg, orgController.getProfile);
router.post("/logout", authOrg, orgController.signout);
router.delete("/delete", authOrg, orgController.delete);

router.get("/blood-stock",authOrg,orgController.bloodStock)
router.patch("/blood-stock",authOrg,orgController.bloodStockUpdate)
router.post("/donate-blood",authOrg,orgController.donateBloodOrg)
router.get("/donate-blood",authOrg,orgController.getDonateBloodOrg)

module.exports = router;