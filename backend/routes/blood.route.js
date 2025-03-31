const express = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const bloodController = require("../controllers/blood.controller");
const router = express.Router();

router.post('/donate-blood-form',authUser,bloodController.donateBloodform)
router.delete('/delete-donate-blood-form',authUser,bloodController.deleteDonateBloodForm)

router.post('/request-blood-form',authUser,bloodController.requestBloodform)
router.get('/nearby-donors-orgs', authUser, bloodController.nearbydonorsOrgsByBloodType)
router.post('/request-blood-form-update',authUser,bloodController.requestBloodFormUpdate)
router.delete('/delete-request-blood-form',authUser,bloodController.deleteRequestBloodForm)

module.exports= router;