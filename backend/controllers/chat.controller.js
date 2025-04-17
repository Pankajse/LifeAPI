const { Chat, Message } = require('../models/chat.model');
const  UserModel = require('../models/user.model');
const OrgModel = require('../models/org.model');
const RequestBloodModel = require('../models/requestBlood.model');
const LocationServices = require('../services/location.service');
const RequestBloodOrgModel = require('../models/requestBloodOrg.model');

// Start or get existing chat
exports.startChat = async (req, res) => {
  try {
    let userId,participantType;
    let { participantId } = req.body;
    const userType = req.type;
    if(userType == 'user'){
      userId = req.user._id;
    }else{
      userId = req.org._id;
    }    
    let participant = await UserModel.findById(participantId);
    if(participant){
      participantType = 'user';
    }
    else{
      participant = await OrgModel.findById(participantId);
      participantType = 'organization';
    }

    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    // Check for existing chat
    let chat = await Chat.findOne({
      participants: { $all: [userId, participantId] }
    }).populate('lastMessage');

    if (!chat) {
      // Create new chat
      chat = new Chat({
        participants: [userId, participantId],
        participantModels: [userType, participantType]
      });
      await chat.save();
    }
    let content;
    if(userType == 'user'){
      const requestBloodForm = await RequestBloodModel.findOne({
        user : userId
      })
      if(requestBloodForm){
        const address = await LocationServices.getAddressFromCoordinates(requestBloodForm.location.ltd,requestBloodForm.location.lng);
        content = `Name : ${req.user.fullname} , Email : ${req.user.email} , BloodType : ${requestBloodForm.bloodType} , Amount : ${requestBloodForm.amount} , Address : ${address}`
      }
    }else{
      const org = req.org;
      const address = await LocationServices.getAddressFromCoordinates(org.location.ltd,org.location.lng);
      const requestBloodForm = await RequestBloodOrgModel.findOne({
        organization : org._id
      })
      content = `Name : ${org.orgName} , Email : ${org.email} , Organization : ${org.orgType} , Address = ${address} , BloodType = ${requestBloodForm.bloodType} , Amount = ${requestBloodForm.amount}`;
    }
    const message = await Message.create({
      chat: chat._id,
      sender: userId,
      senderType : userType,
      content
    });
    await Chat.findByIdAndUpdate(chat._id, {
      lastMessage: message._id
    });

    res.json(chat);
  } catch (error) {
    console.error('Error in startChat:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all chats for a user
exports.getChats = async (req, res) => {
  try {
    const userType = req.type;
    const userId = userType === 'user' ? req.user._id : req.org._id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const chats = await Chat.find({ participants: userId })
      .populate({
        path: 'participants',
        match: { _id: { $ne: userId } },
        select: 'fullname orgName email orgType'
      })
      .populate('lastMessage')
      .sort({ updatedAt: -1 });

    // Calculate unread counts for each chat
    const chatsWithUnreadCounts = await Promise.all(
      chats.map(async (chat) => {
        const unreadCount = await Message.countDocuments({
          chat: chat._id,
          read: false,
          // Optional: exclude messages sent by the current user
          sender: { $ne: userId }
        });
        
        return {
          ...chat.toObject(),
          unreadCount
        };
      })
    );

    res.json(chatsWithUnreadCounts);
  } catch (error) {
    console.error('Error in getChats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get messages for a specific chat
exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userType = req.type;
    const userId = userType === 'user' ? req.user._id : req.org._id;

    // Verify user is participant in chat
    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId
    });

    if (!chat) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const messages = await Message.find({ chat: chatId })
      .populate({
        path: 'sender',
        select: 'fullname orgName email'
      })
      .sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error('Error in getMessages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mark messages as read
exports.markMessagesRead = async (req, res) => {
  try {
    const { messageIds } = req.body;
    const userType = req.type;
    const userId = userType === 'user' ? req.user._id : req.org._id;

    // Verify user has access to these messages
    const messages = await Message.find({
      _id: { $in: messageIds }
    }).populate('chat');

    // Check if user is participant in all chats
    const hasAccess = messages.every(message => 
      message.chat.participants.includes(userId)
    );

    if (!hasAccess) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Message.updateMany(
      { _id: { $in: messageIds } },
      { $set: { read: true } }
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error in markMessagesRead:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete chat
exports.deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    // Verify user is participant in chat
    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId
    });

    if (!chat) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Delete all messages in chat
    await Message.deleteMany({ chat: chatId });
    
    // Delete chat
    await Chat.findByIdAndDelete(chatId);

    res.json({ success: true });
  } catch (error) {
    console.error('Error in deleteChat:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.authData = async(req,res) => {
  const type = req.type;
  let user,org;
    if(type == 'user'){
      user = req.user;
      org = null;
    }else{
      org = req.org;
      user = null;
    } 
    res.status(200).json({user,org,type});
}