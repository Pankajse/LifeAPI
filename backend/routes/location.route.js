const express = require('express');
const router = express.Router();
const validate = require("../middlewares/user.validation");
const locationController = require('../controllers/location.controller');
const { authUser } = require('../middlewares/auth.middleware');

router.get('/get-distance-time', validate.getDistanceTimeValidationRules,authUser,locationController.getDistanceTime);

router.get('/autoSuggestion', validate.autoSuggestionValidationRules,locationController.getAutoSuggestions );

module.exports = router;