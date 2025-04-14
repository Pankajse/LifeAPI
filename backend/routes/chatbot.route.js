const express = require("express")
const router = express.Router();
const { auth } = require("../middlewares/auth.middleware");
const chatbotController = require('../controllers/chatbot.controller')

router.post('/ask',auth,chatbotController.askChatbot);

module.exports = router;