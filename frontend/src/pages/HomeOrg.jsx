import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrgDataContext } from '../context/OrgContext';
import NavbarOrg from '../components/NavbarOrg';
import bloodStockLogo from '../assets/icons/women-transfer-heart.webp';
import donateLogo from '../assets/icons/donate.png';
import requestLogo from '../assets/icons/request.png';
import campaignLogo from '../assets/icons/donate.png';
import chatIcon from '../assets/icons/chatIcon.png';
import inboxLogo from '../assets/icons/inboxLogo.jpg';
import { SocketContext } from '../context/SocketContext';

const HomeOrg = () => {
    const navigate = useNavigate();
    const { org,totalUnits } = useContext(OrgDataContext);
    const { socket } = useContext(SocketContext);
    useEffect(() => {
            socket.emit('join', { userId: org._id, userType: 'org' });
          }, [org]);
    

    return (
        <div className="min-h-screen bg-red-800">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-red-700 to-red-900 py-4 px-4 sm:px-6 shadow-lg">
                <div className="flex justify-between items-center pb-6">
                    <div className="flex items-center gap-3">
                        <img
                            onClick={() => navigate('/org/profile')}
                            className="rounded-full h-11 w-11 cursor-pointer border-2 border-white hover:border-red-300 transition-all"
                            src={org?.logo || "https://cdn-icons-png.flaticon.com/512/2785/2785814.png"}
                            alt="orgLogo"
                        />
                        <div className="flex flex-col">
                            <h4 className="text-lg font-normal text-white">{org?.orgName || "Organization"}</h4>
                            <p className="text-base font-medium text-white capitalize">{org?.orgType || "Blood Bank"}</p>
                        </div>
                    </div>
                    <i 
                        className="ri-notification-2-line text-3xl text-white cursor-pointer hover:text-red-300 transition-all"
                        onClick={() => navigate('/chats')}
                    ></i>
                </div>

                {/* Stats Section */}
                <div className="flex justify-between gap-4">
                    <div 
                        className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer"
                        onClick={() => navigate('/blood-stock')}
                    >
                        <img className="w-10 h-10" src={bloodStockLogo} alt="bloodStock" />
                        <div className="flex flex-col">
                            <h4 className="text-lg font-medium text-white">Blood Stock</h4>
                            <p className="text-sm font-normal text-white">{totalUnits || 0} units available</p>
                        </div>
                    </div>

                    <div 
                        className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer"
                        onClick={() => navigate('/donate-blood-org')}
                    >
                        <img className="w-10 h-10" src={donateLogo} alt="donate" />
                        <div className="flex flex-col">
                            <h4 className="text-lg font-medium text-white">Donate Blood</h4>
                            <p className="text-sm font-normal text-white">Add to stock</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="bg-white rounded-t-3xl p-4 sm:p-6 shadow-lg">
                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { 
                            logo: bloodStockLogo, 
                            title: 'Blood Stock', 
                            onClick: () => navigate('/blood-stock'),
                            description: 'Manage inventory'
                        },
                        { 
                            logo: donateLogo, 
                            title: 'Donate Blood', 
                            onClick: () => navigate('/donate-blood-org'),
                            description: 'Add blood units'
                        },
                        { 
                            logo: requestLogo, 
                            title: 'Request Blood', 
                            onClick: () => navigate('/request-blood-org'),
                            description: 'Get blood units'
                        },
                        { 
                            logo: campaignLogo, 
                            title: 'Events', 
                            onClick: () => navigate('/events'),
                            description: 'Manage drives'
                        },
                        { 
                            logo: chatIcon, 
                            title: 'Chatbot', 
                            onClick: () => navigate('/chatbot'),
                            description: 'Get assistance'
                        },
                        { 
                            logo: inboxLogo, 
                            title: 'Inbox', 
                            onClick: () => navigate('/chats-org'),
                            description: 'View messages'
                        },
                    ].map((item, index) => (
                        <button
                            key={index}
                            onClick={item.onClick}
                            className="flex flex-col items-center justify-center bg-[#f1e6e6] p-4 rounded-xl hover:bg-red-100 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            <img className="w-12 h-12 mb-2" src={item.logo} alt={item.title} />
                            <h4 className="text-lg font-semibold text-center text-gray-800">{item.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Navbar */}
            <NavbarOrg className="sticky bottom-0" />
        </div>
    );
};

export default HomeOrg;