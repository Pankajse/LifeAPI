
import React, { useContext, useEffect } from 'react';
import calendarLogo from '../assets/icons/calendarLogo.png';
import sheildLogo from '../assets/icons/sheild.png';
import poster1 from '../assets/images/poster1.jpg';
import poster2 from '../assets/images/poster2.webp';
import poster3 from '../assets/images/poster3.jpg';
import donateLogo from '../assets/icons/donate.png';
import requestLogo from '../assets/icons/request.png';
import bloodBankLogo from '../assets/icons/bloodBankLogo.png';
import chatIcon from '../assets/icons/chatIcon.png';
import inbox from '../assets/icons/inboxLogo.jpg';
import emergencyNoLogo from '../assets/icons/emergencyNoLogo.png';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';

const Home = () => {

    const navigate = useNavigate();
    const {user} = useContext(UserDataContext);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.emit('join', { userId: user._id, userType: 'user' });
      }, [user]);

    return (
        <div className="min-h-screen bg-red-800">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-red-700 to-red-900 py-4 px-4 sm:px-6 shadow-lg">
                <div className="flex justify-between items-center pb-6">
                    <div className="flex items-center gap-3">
                        <img
                            onClick={() => navigate('/profile')}
                            className="rounded-full h-11 w-11 cursor-pointer border-2 border-white hover:border-red-300 transition-all"
                            src="https://yt3.ggpht.com/a/AATXAJxPIvCmwTp3vwBzE9HSYF3CiM-Nl6Ed3cAMJg=s900-c-k-c0xffffffff-no-rj-mo"
                            alt="profilePic"
                        />
                        <div className="flex flex-col">
                            <h4 className="text-lg font-normal text-white">{user.fullname}</h4>
                            <p className="text-base font-medium text-white">{user.email}</p>
                        </div>
                    </div>
                    <i className="ri-notification-2-line text-3xl text-white cursor-pointer hover:text-red-300 transition-all"></i>
                </div>

                {/* Stats Section */}
                <div  className="flex justify-between gap-4" onClick={() => navigate('/donate-blood')}>
                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all">
                        <img className="w-10 h-10" src={sheildLogo} alt="sheildLogo" />
                        <div className="flex flex-col">
                            <h4 className="text-lg font-medium text-white">Donate Blood</h4>
                            <p className="text-sm font-normal text-white">Save Lives</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all">
                        <img className="w-10 h-10" src={calendarLogo} alt="calendarLogo" />
                        <div className="flex flex-col">
                            <h4 className="text-lg font-medium text-white">19.03.25</h4>
                            <p className="text-sm font-normal text-white">54 Days Left</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="bg-white rounded-t-3xl p-4 sm:p-6 shadow-lg">
                {/* Events Section */}
                <div className="mb-6">
                    <h3 className="text-xl font-medium mb-4 text-gray-800">Blood Donation Campaign</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4">
                        <img className="w-48 h-32 rounded-lg shadow-md hover:shadow-lg transition-all" src={poster1} alt="poster" />
                        <img className="w-48 h-32 rounded-lg shadow-md hover:shadow-lg transition-all" src={poster2} alt="poster" />
                        <img className="w-48 h-32 rounded-lg shadow-md hover:shadow-lg transition-all" src={poster3} alt="poster" />
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                        { logo: donateLogo, title: 'Donate Blood', onClick: () => navigate('/donate-blood') },
                        { logo: requestLogo, title: 'Request Blood', onClick: () => navigate('/request-blood') },
                        { logo: bloodBankLogo, title: 'Events', onClick: () => navigate('/events') },
                        { logo: chatIcon, title: 'Chatbot', onClick: () => {navigate('/chatbot')} },
                        { logo: inbox, title: 'Inbox', onClick: () => {navigate('/chats')} },
                        { logo: emergencyNoLogo, title: 'Emergency Numbers', onClick: () => {} },
                    ].map((item, index) => (
                        <button
                            key={index}
                            onClick={item.onClick}
                            className="flex flex-col items-center justify-center bg-[#f1e6e6] p-4 rounded-xl hover:bg-red-100 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            <img className="w-12 h-12 mb-2" src={item.logo} alt={item.title} />
                            <h4 className="text-lg font-semibold text-center text-gray-800">{item.title}</h4>
                        </button>
                    ))}
                </div>
            </div>

            {/* Navbar */}
            <Navbar className="sticky bottom-0" />
        </div>
    );
};

export default Home;