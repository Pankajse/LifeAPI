import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/chats/get-users`,
          { type: "user" },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setChats(response.data);
      } catch (err) {
        setError('Failed to fetch chats');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      // Same day - show time
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // Different day - show date
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getName = (chat) => {
    // Get the other member (not the current user)
    const otherMember = chat.members.find(member => 
      member._id !== localStorage.getItem('userId') // Assuming you store userId in localStorage
    ) || chat.members[0]; // Fallback to first member if not found
    
    return otherMember?.fullname || otherMember?.orgName || 'Unknown';
  };

  const getLastMessage = (chat) => {
    if (!chat.messages || chat.messages.length === 0) return 'No messages yet';
    return chat.messages[chat.messages.length - 1].text;
  };

  const getLastMessageTime = (chat) => {
    if (!chat.messages || chat.messages.length === 0) return '';
    return formatTimestamp(chat.messages[chat.messages.length - 1].timestamp);
  };

  const handleChatClick = (chatId) => {
    navigate(`/chats/${chatId}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading chats...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-600 text-white p-4">
        <h1 className="text-xl font-semibold">Chats</h1>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">No chats found</p>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat._id}
              className="flex items-center p-3 border-b border-gray-200 bg-white hover:bg-gray-50 cursor-pointer"
              onClick={() => handleChatClick(chat._id)}
            >
              {/* Placeholder for profile picture (just a colored circle) */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-semibold mr-3">
                {getName(chat).charAt(0).toUpperCase()}
              </div>

              {/* Chat info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h2 className="font-semibold text-gray-800 truncate">
                    {getName(chat)}
                  </h2>
                  <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                    {getLastMessageTime(chat)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {getLastMessage(chat)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;