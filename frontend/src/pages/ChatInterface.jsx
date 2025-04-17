import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

const ChatInterface = () => {
  const { chatId } = useParams();
  const { socket } = useContext(SocketContext);
  const { user, org, type } = useContext(useAuth);
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [participant, setParticipant] = useState(null);
  const messagesEndRef = useRef(null);
  const currentUserId = type === 'user' ? user._id : org._id;

  // Fetch chat messages and participant info
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/chat/messages/${chatId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setMessages(response.data);
        
        // Get participant info (the other user in chat)
        const chatInfo = await axios.get(`http://localhost:3000/api/chat/all`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const currentChat = chatInfo.data.find(chat => chat._id === chatId);
        if (currentChat) {
          setParticipant(currentChat.participants[0]);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch chat data');
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
  }, [chatId]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      if (data.chatId === chatId) {
        setMessages(prev => [...prev, data.message]);
        
        // Mark as read if it's the current user's chat
        if (data.message.sender._id !== currentUserId) {
          markMessagesAsRead([data.message._id]);
        }
      }
    };

    const handleMessagesRead = (data) => {
      if (data.chatId === chatId) {
        setMessages(prev => 
          prev.map(msg => 
            data.messageIds.includes(msg._id) 
              ? { ...msg, read: true } 
              : msg
          )
        );
      }
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('messagesRead', handleMessagesRead);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('messagesRead', handleMessagesRead);
    };
  }, [socket, chatId, currentUserId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Mark messages as read when opening chat
    const unreadMessages = messages.filter(msg => 
      !msg.read && msg.sender !== currentUserId
    );
    
    if (unreadMessages.length > 0) {
      markMessagesAsRead(unreadMessages.map(msg => msg._id));
    }
  }, [messages, currentUserId]);

  const markMessagesAsRead = async (messageIds) => {
    try {
      const token = localStorage.getItem('token');
      
      // Optimistically update the UI first
      setMessages(prev => 
        prev.map(msg => 
          messageIds.includes(msg._id) 
            ? { ...msg, read: true } 
            : msg
        )
      );
  
      // Then make the API call
      await axios.post('http://localhost:3000/api/chat/read', {
        messageIds
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Emit socket event
      socket.emit('markRead', { messageIds, chatId });
    } catch (err) {
      console.error('Error marking messages as read:', err);
      // Revert UI if there's an error
      setMessages(prev => 
        prev.map(msg => 
          messageIds.includes(msg._id) 
            ? { ...msg, read: false } 
            : msg
        )
      );
    }
  };
  

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const messageData = {
        chatId,
        content: newMessage,
        senderId: currentUserId,
        senderType: type
      };

      // Send via socket
      socket.emit('sendMessage', messageData, (response) => {
        if (response.success) {
          setMessages(prev => [...prev, response.message]);
          setNewMessage('');
        }
      });
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading chat...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat header */}
      <div className="bg-white p-4 shadow-sm flex items-center border-b">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {participant && (
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
              {participant.fullname 
                ? participant.fullname.charAt(0).toUpperCase()
                : participant.orgName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">
                {participant.fullname || participant.orgName}
              </h2>
              <p className="text-xs text-gray-500">
                {participant.orgType || 'User'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${message.sender === currentUserId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.sender === currentUserId 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'}`}
              >
                <p className="break-words">{message.content}</p>
                <div className={`flex items-center justify-end mt-1 space-x-1 text-xs ${message.sender === currentUserId ? 'text-blue-100' : 'text-gray-500'}`}>
                  <span>{formatTime(message.timestamp)}</span>
                  {message.sender === currentUserId && (
                    <span className="flex items-center">
                      {message.read ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 -ml-1.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="bg-white p-4 border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="ml-2 bg-blue-500 text-white rounded-full p-2 disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;