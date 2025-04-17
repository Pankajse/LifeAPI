const socketIo = require('socket.io');
const { Chat, Message } = require('./models/chat.model');
const UserModel = require('./models/user.model');
const OrgModel = require('./models/org.model');

function initializeSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });


  const connectedUsers = new Map();

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join',async ({ userId, userType }) => {
      connectedUsers.set(userId, { socketId: socket.id, userType });
      if (userType === 'user') {
        await UserModel.findByIdAndUpdate(userId, { socketId: socket.id });
    } else if (userType === 'org') {
        await OrgModel.findByIdAndUpdate(userId, { socketId: socket.id });
    }
      console.log(`${userType} ${userId} joined`);
    });

    socket.on('sendMessage', async (data, callback) => {
      try {
        const { chatId, content, senderId, senderType } = data;

        // Create and save the message
        const message = new Message({
          chat: chatId,
          sender: senderId,
          senderType,
          content,
          timestamp: new Date()
        });
        await message.save();

        // Update the chat's last message
        await Chat.findByIdAndUpdate(chatId, {
          lastMessage: message._id
        });

        // Get chat participants
        const chat = await Chat.findById(chatId);
        const recipientId = chat.participants.find(p => p.toString() !== senderId.toString());

        // Emit to all participants
        io.to(chatId).emit('newMessage', {
          chatId,
          message: {
            ...message.toObject(),
            sender: { _id: senderId, type: senderType }
          }
        });

        // Send notification to recipient if they're connected
        const recipientSocket = connectedUsers.get(recipientId.toString());
        if (recipientSocket) {
          io.to(recipientSocket.socketId).emit('messageNotification', {
            chatId,
            message: {
              ...message.toObject(),
              sender: { _id: senderId, type: senderType }
            }
          });
        }

        callback({ success: true, message });
      } catch (error) {
        console.error('Error sending message:', error);
        callback({ success: false, error: error.message });
      }
    });

    socket.on('markRead', async ({ messageIds, chatId }) => {
      try {
        await Message.updateMany(
          { _id: { $in: messageIds } },
          { $set: { read: true } }
        );

        // Notify other participants
        io.to(chatId).emit('messagesRead', { messageIds });
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    });

    socket.on('disconnect', () => {
      // Remove user from connected users
      for (const [userId, userData] of connectedUsers.entries()) {
        if (userData.socketId === socket.id) {
          connectedUsers.delete(userId);
          break;
        }
      }
      console.log('Client disconnected');
    });
  });

  return io;
}

module.exports = initializeSocket;