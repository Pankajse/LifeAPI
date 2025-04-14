const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const bloodController = require("../controllers/blood.controller");
const router = express.Router();

router.post('/donate-blood-form',auth,bloodController.donateBloodform)
router.delete('/delete-donate-blood-form',auth,bloodController.deleteDonateBloodForm)

router.post('/request-blood-form',auth,bloodController.requestBloodform)
router.get('/nearby-donors-orgs', auth, bloodController.nearbydonorsOrgsByBloodType)
router.post('/request-blood-form-update',auth,bloodController.requestBloodFormUpdate)
router.delete('/delete-request-blood-form',auth,bloodController.deleteRequestBloodForm)

module.exports= router;