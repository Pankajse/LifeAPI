const express = require("express");
const router = express.Router();
const { auth} = require("../middlewares/auth.middleware");
const chatController = require("../controllers/chat.controller");

router.post('/connect',auth,chatController.connect);

router.post('/get-users',auth,chatController.getChatUsers);

module.exports = router;