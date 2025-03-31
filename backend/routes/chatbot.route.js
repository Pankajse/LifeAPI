const express = require("express")
const router = express.Router();
const { authUser } = require("../middlewares/auth.middleware");
const chatbotController = require('../controllers/chatbot.controller')

router.post('/ask',authUser,chatbotController.askChatbot);

module.exports = router;