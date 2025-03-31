import React from 'react'
import { useNavigate } from 'react-router-dom'
import DonateBloodForm from '../components/donateBloodForm';
import DonateBloodSub from '../components/DonateBloodSubmitted';

const DonateBlood = () => {
    const navigate = useNavigate();
    return (
        <div className='h-screen p-4'>

            <div className='flex justify-between py-1'>
                <div className='flex items-center'>
                    <button onClick={()=>{navigate('/home')}}><i className="ri-arrow-left-s-line text-3xl font-medium "></i></button>
                    <h4 className='text-xl font-medium'>Donate Blood</h4>
                </div>
                <div className='flex items-center gap-1'>
                    <i className="ri-notification-2-line text-3xl text-gray-800 "></i>
                    <i className="ri-more-2-fill text-3xl font-medium "></i>
                </div>
            </div>
            <DonateBloodForm/>
            {/* <DonateBloodSub/> */}

        </div>
    )
}

export default DonateBlood