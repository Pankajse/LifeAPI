import React from 'react'
import calendarLogo from '../assets/icons/calendarLogo.png'
import sheildLogo from '../assets/icons/sheild.png'
import poster1 from '../assets/images/poster1.jpg'
import poster2 from '../assets/images/poster2.webp'
import poster3 from '../assets/images/poster3.jpg'
import donateLogo from '../assets/icons/donate.png'
import requestLogo from '../assets/icons/request.png'
import bloodBankLogo from '../assets/icons/bloodBankLogo.png'
import hospitalLogo from '../assets/icons/hospitalLogo.png'
import inbox from '../assets/icons/inboxLogo.jpg'
import emergencyNoLogo from '../assets/icons/emergencyNoLogo.png'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='m-0 p-0 bg-red-800'>
            <div className='bg-red-800 py-4 px-3'>

                <div className='flex justify-between pb-8'>
                    <div className='flex items-center gap-2'>
                        <img className='rounded-full h-11 w-11' src="https://yt3.ggpht.com/a/AATXAJxPIvCmwTp3vwBzE9HSYF3CiM-Nl6Ed3cAMJg=s900-c-k-c0xffffffff-no-rj-mo" alt="profilePic" />
                        <div className='profile flex flex-col '>
                            <h4 className='text-lg font-normal text-white'>Pankaj Singh</h4>
                            <p className='text-base font-medium text-white'>Addaguta, Hyderabad</p>
                        </div>
                    </div>
                    <i className="ri-notification-2-line text-4xl text-white"></i>
                </div>

                <div className='flex justify-between'>
                    <div className='Lifesaver flex justify-center items-center'>
                        <img className='w-12' src={sheildLogo} alt="sheildLogo" />
                        <div className='flex flex-col'>
                            <h4 className='text-lg font-medium text-white' >Lifesaver</h4>
                            <p className='text-sm font-normal text-white' >15 People</p>
                        </div>
                    </div>

                    <div className='calendar  flex justify-center items-center gap-1'>
                        <img className='w-12' src={calendarLogo} alt="calendarLogo" />
                        <div className='flex flex-col'>
                            <h4 className='text-lg font-medium text-white'>19.03.25</h4>
                            <p className='text-sm font-normal text-white'>54 Days Left</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className='bg-white py-3 px-3 rounded-2xl'>
                <div className='Events mb-5'>
                    <h3 className='text-xl font-medium mb-2'>Blood Donation Campaign</h3>
                    <div className='flex gap-5 '>
                    <img className='w-40 h-30' src={poster1} alt="poster" />
                    <img className='w-40 h-30' src={poster2} alt="poster" />
                    {/* <img className='w-40 h-30' src={poster3} alt="poster" /> */}
                    </div>
                </div>

                <div className='features grid grid-cols-2 gap-5'>

                    <button className='flex bg-[#f1e6e6] py-8 px-10 items-center justify-center gap-2 rounded-xl '
                    onClick={()=>{navigate('/donate-blood-form')}}
                    >
                        <img className='w-14' src={donateLogo} alt="" />
                        <div className='flex flex-col'>
                            <h4 className='text-lg font-semibold'>Donate</h4>
                            <h4 className='text-lg font-semibold'>Blood</h4>
                        </div>
                    </button>

                    <button className='flex items-center justify-center bg-[#f1e6e6] py-8 px-10 gap-2 rounded-xl '
                    onClick={()=>{navigate('/request-blood-form')}}
                    >
                        <img className='w-14' src={requestLogo} alt="" />
                        <div className='flex flex-col'>
                            <h4 className='text-lg font-semibold'>Request</h4>
                            <h4 className='text-lg font-semibold'>Blood</h4>
                        </div>
                    </button>

                    <button className='flex items-center justify-center bg-[#f1e6e6] py-8 px-10 gap-2 rounded-xl '>
                        <img className='w-14' src={bloodBankLogo} alt="" />
                        <div className='flex flex-col'>
                            <h4 className='text-lg font-semibold'>Blood</h4>
                            <h4 className='text-lg font-semibold'>Bank</h4>
                        </div>
                    </button>

                    <button className='flex items-center justify-center bg-[#f1e6e6] py-8 px-10 gap-2 rounded-xl '>
                        <img className='w-14' src={hospitalLogo} alt="" />
                        <h4 className='text-lg font-semibold'>Hospital</h4>
                    </button>

                    <button className='flex items-center justify-center bg-[#f1e6e6] py-8 px-10 gap-2 rounded-xl '>
                        <img className='w-14' src={inbox} alt="" />
                        <h4 className='text-lg font-semibold'>Inbox</h4>
                    </button>

                    <button className='flex items-center justify-center bg-[#f1e6e6] py-8 px-10 gap-2 rounded-xl '>
                        <img className='w-14' src={emergencyNoLogo} alt="" />
                        <div className='flex flex-col'>
                            <h4 className='text-lg font-semibold'>Emergency</h4>
                            <h4 className='text-lg font-semibold'>Numbers</h4>
                        </div>
                    </button>

                </div>
            </div>
            <Navbar className='sticky bottom-0' />
        </div>
    )
}

export default Home