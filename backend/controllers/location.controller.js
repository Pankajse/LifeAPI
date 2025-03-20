const { validationResult } = require('express-validator');
const { getDistanceTime } = require('../services/location.service');
const { getAutoSuggestions } = require('../services/location.service');

module.exports.getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    try {
        const dateTime = await getDistanceTime(origin, destination);
        return res.status(200).json(dateTime);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.getAutoSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { input } = req.query;
    try {
        const suggestions = await getAutoSuggestions(input);
        return res.status(200).json(suggestions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}