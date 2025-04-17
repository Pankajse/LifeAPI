const express = require("express");
const router = express.Router();
const {
  startChat,
  getChats,
  getMessages,
  markMessagesRead,
  deleteChat,
  authData
} = require("../controllers/chat.controller");
const { auth } = require("../middlewares/auth.middleware");

// All routes require authentication
router.use(auth);

// Start or get existing chat
router.post("/start", startChat);

// Get all chats for current user
router.get("/all", getChats);

// Get messages for a specific chat
router.get("/messages/:chatId", getMessages);

// Mark messages as read
router.post("/read", markMessagesRead);

// Delete chat
router.delete("/:chatId", deleteChat);

router.get("/auth-data",authData)

module.exports = router;