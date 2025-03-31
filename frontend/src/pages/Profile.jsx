import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                navigate('/signin');
            } finally {
                setLoading(false);
            }
        };

        if (!user && localStorage.getItem('token')) {
            fetchUserData();
        } else {
            setLoading(false);
        }
    }, [user, setUser, navigate]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center">Please sign in to view your profile</div>;
    }

    return (
        <div className='min-h-screen flex flex-col justify-between'>
            {/* Header with Shining Effect */}
            <div className='flex flex-col items-center bg-[#eeee] w-full'>
                <div className='shining-header flex items-center justify-center bg-red-900 pb-20 pt-10 w-full rounded-b-3xl relative overflow-hidden'>
                    <button onClick={() => navigate('/home')} className='absolute left-4'>
                        <i className="ri-arrow-left-s-line text-3xl font-medium text-white"></i>
                    </button>
                    <h4 className='text-xl font-semibold text-white'>Profile</h4>
                </div>

                {/* Profile Picture and Details */}
                <div>
                    <img
                        className='rounded-full h-40 w-40 outline-4 outline-white relative bottom-16'
                        src={user.profilePic || "https://yt3.ggpht.com/a/AATXAJxPIvCmwTp3vwBzE9HSYF3CiM-Nl6Ed3cAMJg=s900-c-k-c0xffffffff-no-rj-mo"}
                        alt="profilePic"
                    />
                    <div className='flex flex-col justify-center items-center relative bottom-10'>
                        <h4 className='text-2xl font-semibold'>{user.fullname}</h4>
                        <p className='font-medium text-gray-700'>{user.email}</p>
                    </div>
                </div>

                {/* Edit Profile Button */}
                <button className='bg-red-800 px-6 py-2 rounded-xl text-white font-semibold hover:bg-red-900 transition-colors'>
                    Edit profile
                </button>

                {/* Profile Options */}
                <div className='w-full p-4'>
                    <button className='flex w-full justify-between items-center py-4 hover:bg-gray-100 rounded-lg px-2'>
                        <div className='flex items-center gap-1.5'>
                            <i className="ri-user-3-line font-medium text-2xl text-violet-900"></i>
                            <h5 className='font-medium text-xl text-gray-800'>Account Information</h5>
                        </div>
                        <i className="ri-arrow-right-s-line font-medium text-2xl"></i>
                    </button>
                    <hr className='text-gray-500' />

                    <button className='flex w-full justify-between items-center py-4 hover:bg-gray-100 rounded-lg px-2'>
                        <div className='flex items-center gap-1.5'>
                            <i className="ri-settings-5-line font-medium text-2xl text-violet-900"></i>
                            <h5 className='font-medium text-xl text-gray-800'>Setting</h5>
                        </div>
                        <i className="ri-arrow-right-s-line font-medium text-2xl"></i>
                    </button>
                    <hr className='text-gray-500' />

                    <button className='flex w-full justify-between items-center py-4 hover:bg-gray-100 rounded-lg px-2'>
                        <div className='flex items-center gap-1.5'>
                            <i className="ri-time-line font-medium text-2xl text-violet-900"></i>
                            <h5 className='font-medium text-xl text-gray-800'>Recent Activity</h5>
                        </div>
                        <i className="ri-arrow-right-s-line font-medium text-2xl"></i>
                    </button>
                    <hr className='text-gray-500' />

                    <button 
                        onClick={async() => {
                            try {
                                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`, {}, {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem('token')}`
                                    }
                                });
                                if (response.status === 200 || response.status === 201) {
                                    localStorage.removeItem('token');
                                    setUser(null);
                                    navigate('/signin');
                                }
                            } catch (error) {
                                console.error("Logout error:", error);
                            }
                        }}
                        className='flex w-full justify-between items-center py-4 hover:bg-gray-100 rounded-lg px-2'
                    >
                        <div className='flex items-center gap-1.5'>
                            <i className="ri-login-box-line font-medium text-2xl text-violet-900"></i>
                            <h5 className='font-medium text-xl text-gray-800'>Logout</h5>
                        </div>
                    </button>
                </div>
            </div>

            {/* Navbar */}
            <Navbar className='sticky bottom-0' />
        </div>
    );
};

export default Profile;

// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { UserDataContext } from '../context/UserContext';
// import axios from 'axios';

// const Profile = () => {
//     const navigate = useNavigate();
//     const {user} = useContext(UserDataContext);

//     return (
//         <div className='min-h-screen flex flex-col justify-between'>
//             {/* Header with Shining Effect */}
//             <div className='flex flex-col items-center bg-[#eeee] w-full'>
//                 <div className='shining-header flex items-center justify-center bg-red-900 pb-20 pt-10 w-full rounded-b-3xl relative overflow-hidden'>
//                     <button onClick={() => navigate('/home')} className='absolute left-4'>
//                         <i className="ri-arrow-left-s-line text-3xl font-medium text-white"></i>
//                     </button>
//                     <h4 className='text-xl font-semibold text-white'>Profile</h4>
//                 </div>

//                 {/* Profile Picture and Details */}
//                 <div>
//                     <img
//                         className='rounded-full h-40 w-40 outline-4 outline-white relative bottom-16'
//                         src="https://yt3.ggpht.com/a/AATXAJxPIvCmwTp3vwBzE9HSYF3CiM-Nl6Ed3cAMJg=s900-c-k-c0xffffffff-no-rj-mo"
//                         alt="profilePic"
//                     />
//                     <div className='flex flex-col justify-center items-center relative bottom-10'>
//                         <h4 className='text-2xl font-semibold'>{user.fullname}</h4>
//                         <p className='font-medium text-gray-700'>{user.email}</p>
//                     </div>
//                 </div>

//                 {/* Edit Profile Button */}
//                 <button className='bg-red-800 px-6 py-2 rounded-xl text-white font-semibold hover:bg-red-900 transition-colors'>
//                     Edit profile
//                 </button>

//                 {/* Profile Options */}
//                 <div className='w-full p-4'>
//                     <button className='flex w-full justify-between items-center py-4 hover:bg-gray-100 rounded-lg px-2'>
//                         <div className='flex items-center gap-1.5'>
//                             <i className="ri-user-3-line font-medium text-2xl text-violet-900"></i>
//                             <h5 className='font-medium text-xl text-gray-800'>Account Information</h5>
//                         </div>
//                         <i className="ri-arrow-right-s-line font-medium text-2xl"></i>
//                     </button>
//                     <hr className='text-gray-500' />

//                     <button className='flex w-full justify-between items-center py-4 hover:bg-gray-100 rounded-lg px-2'>
//                         <div className='flex items-center gap-1.5'>
//                             <i className="ri-settings-5-line font-medium text-2xl text-violet-900"></i>
//                             <h5 className='font-medium text-xl text-gray-800'>Setting</h5>
//                         </div>
//                         <i className="ri-arrow-right-s-line font-medium text-2xl"></i>
//                     </button>
//                     <hr className='text-gray-500' />

//                     <button className='flex w-full justify-between items-center py-4 hover:bg-gray-100 rounded-lg px-2'>
//                         <div className='flex items-center gap-1.5'>
//                             <i className="ri-time-line font-medium text-2xl text-violet-900"></i>
//                             <h5 className='font-medium text-xl text-gray-800'>Recent Activity</h5>
//                         </div>
//                         <i className="ri-arrow-right-s-line font-medium text-2xl"></i>
//                     </button>
//                     <hr className='text-gray-500' />

//                     <button 
//                     onClick={async()=>{
//                         const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
//                             headers : {
//                                 Authorization : `Bearer ${localStorage.getItem('token')}`
//                             }
//                         })
//                         if(response.status == 201){
//                             navigate('/signin');
//                         }
//                     }}
//                     className='flex w-full justify-between items-center py-4 hover:bg-gray-100 rounded-lg px-2'>
//                         <div className='flex items-center gap-1.5'>
//                             <i className="ri-login-box-line font-medium text-2xl text-violet-900"></i>
//                             <h5 className='font-medium text-xl text-gray-800'>Logout</h5>
//                         </div>
//                     </button>
//                 </div>
//             </div>

//             {/* Navbar */}
//             <Navbar className='sticky bottom-0' />
//         </div>
//     );
// };

// export default Profile;