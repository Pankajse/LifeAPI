import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/chat/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setChats(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch chats');
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleChatClick = (chatId) => {
    navigate(`/chats/${chatId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600">Loading chats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Messages</h1>
      
      {chats.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No conversations yet</div>
      ) : (
        <div className="space-y-3">
          {chats.map((chat) => {
            const participant = chat.participants[0]; // The other participant
            const isUnread = chat.unreadCount > 0;
            const lastMessage = chat.lastMessage || { 
              content: 'No messages yet', 
              timestamp: chat.createdAt 
            };

            return (
              <div 
                key={chat._id} 
                className={`
                  flex items-center p-4 rounded-xl cursor-pointer
                  ${isUnread ? 'bg-blue-50' : 'bg-white'}
                  hover:bg-gray-50 transition-colors duration-200
                  shadow-sm border border-gray-100
                `}
                onClick={() => handleChatClick(chat._id)}
              >
                <div className={`
                  flex-shrink-0 w-12 h-12 rounded-full 
                  bg-blue-500 text-white flex items-center 
                  justify-center text-xl font-bold
                `}>
                  {participant.fullname 
                    ? participant.fullname.charAt(0).toUpperCase()
                    : participant.orgName.charAt(0).toUpperCase()}
                </div>
                
                <div className="ml-4 flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {participant.fullname || participant.orgName}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                      {formatTimestamp(lastMessage.timestamp)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-600 truncate">
                      {lastMessage.content.length > 50 
                        ? `${lastMessage.content.substring(0, 50)}...` 
                        : lastMessage.content}
                    </p>
                    {isUnread && (
                      <span className={`
                        ml-2 flex-shrink-0 w-5 h-5 rounded-full
                        bg-blue-500 text-white text-xs flex
                        items-center justify-center
                      `}>
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChatList;