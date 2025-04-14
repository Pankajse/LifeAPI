const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth.middleware");
const orgController = require("../controllers/org.controller");
const validate = require("../middlewares/user.validation");

router.post("/signup", validate.orgRegistrationValidationRules, orgController.signup);
router.post("/signin", validate.orgSigninValidationRules, orgController.signin);
router.get("/me", auth, orgController.getProfile);
router.post("/logout", auth, orgController.signout);
router.delete("/delete", auth, orgController.delete);

router.get("/blood-stock",auth,orgController.bloodStock)
router.patch("/blood-stock",auth,orgController.bloodStockUpdate)
router.post("/donate-blood",auth,orgController.donateBloodOrg)
router.get("/donate-blood",auth,orgController.getDonateBloodOrg)

router.post('/request-blood-form',auth,orgController.requestBloodformOrg)

router.get('/nearby-donors-orgs', auth, orgController.nearbydonorsOrgsByBloodType)

module.exports = router;