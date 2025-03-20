import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

const Profile = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center bg-[#eeee] h-screen'>
            <div className='flex items-center bg-red-900 pb-20 pt-10 w-full rounded-b-3xl '>
                <button onClick={() => { navigate('/home') }}><i className="ri-arrow-left-s-line text-3xl font-medium text-white"></i></button>
                <h4 className='text-xl font-semibold text-white'>Profile</h4>
            </div>
            <div>
                <img className='rounded-full h-40 w-40 relative bottom-16 outline-4 outline-white' src="https://yt3.ggpht.com/a/AATXAJxPIvCmwTp3vwBzE9HSYF3CiM-Nl6Ed3cAMJg=s900-c-k-c0xffffffff-no-rj-mo" alt="profilePic" />
                <div className='flex flex-col justify-center items-center relative bottom-10 ' >
                    <h4 className='text-2xl font-semibold '>Pankaj Singh</h4>
                    <p className='font-medium text-gray-700'>Addaguta, Hyderabad</p>
                </div>
            </div>
            <button className='bg-red-800 px-6 py-2 rounded-xl text-white font-semibold'>Edit profile</button>
            <div className='w-full p-4'>
            <button className='flex w-full justify-between items-center py-4'>
                <div className='flex items-center gap-1.5'>
                    <i className="ri-user-3-line font-medium text-2xl text-violet-900 "></i>
                    <h5 className='font-medium text-xl text-gray-800'>Account Information</h5>
                </div>
                <i className="ri-arrow-right-s-line font-medium text-2xl"></i>
            </button>
            <hr className='text-gray-500' />
            <button className='flex w-full justify-between items-center py-4'>
                <div className='flex items-center gap-1.5'>
                    <i className="ri-settings-5-line font-medium text-2xl text-violet-900 "></i>
                    <h5 className='font-medium text-xl text-gray-800'>Setting</h5>
                </div>
                <i className="ri-arrow-right-s-line font-medium text-2xl"></i>
            </button>
            <hr className='text-gray-500' />
            <button className='flex w-full justify-between items-center py-4'>
                <div className='flex items-center gap-1.5'>
                    <i className="ri-time-line font-medium text-2xl text-violet-900 "></i>
                    <h5 className='font-medium text-xl text-gray-800'>Recent Activity</h5>
                </div>
                <i className="ri-arrow-right-s-line font-medium text-2xl"></i>
            </button>
            <hr className='text-gray-500' />
            <button className='flex w-full justify-between items-center py-4'>
                <div className='flex items-center gap-1.5'>
                    <i className="ri-login-box-line font-medium text-2xl text-violet-900 "></i>
                    <h5 className='font-medium text-xl text-gray-800'>Logout</h5>
                </div>
            </button>
            </div>
        </div>
    )
}

export default Profile