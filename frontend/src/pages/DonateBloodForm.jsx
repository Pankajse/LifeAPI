import React from 'react'
import { useNavigate } from 'react-router-dom'

const DonateBloodform = () => {
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

            <form action="">
                <h5 className='font-medium py-1 text-gray-700'>Enter your Full Name</h5>
                <input type="text" placeholder='Your name here' className='w-full rounded-lg my-2 py-1.5 px-2 text-base outline-2 outline-gray-500 font-medium ' />
                <h5 className='font-medium py-1 text-gray-700'>Blood Type</h5>
                <input type="text" placeholder='Select your Blood Type' className='w-full rounded-lg my-2 py-1.5 px-2 text-base outline-2 outline-gray-500 font-medium ' />
                <h5 className='font-medium py-1 text-gray-700'>Health Status</h5>
                <input type="text" placeholder='Recent surgery, allergy, vaccine or taking medicine' className='w-full rounded-lg my-2 py-1.5 px-2 text-base outline-2 outline-gray-500 font-medium ' />
                <h5 className='font-medium py-1 text-gray-700'>Last Donation Date</h5>
                <input type="date" placeholder='Select Date' className='w-full rounded-lg my-2 py-1.5 px-2 text-base outline-2 outline-gray-500 font-medium ' />
                <h5 className='font-medium py-1 text-gray-700'>Availability till date and city</h5>
                <input type="date" placeholder='Date till available' className='w-full rounded-lg my-2 py-1.5 px-2 text-base outline-2 outline-gray-500 font-medium ' />
                <input type="text" placeholder='City' className='w-full rounded-lg my-2 py-1.5 px-2 text-base outline-2 outline-gray-500 font-medium ' />
                <div className='flex justify-around'>
                    <div className='inline'>
                        <h5 className='font-medium py-1 text-gray-700'>Weight</h5>
                        <input type="number" placeholder='Select Your Weight' className='w-40 rounded-lg my-2 py-1.5 px-2 text-base outline-2 outline-gray-500 font-medium ' />
                    </div>
                    <div className='inline'>
                        <h5 className='font-medium py-1 text-gray-700'>Age</h5>
                        <input type="number" placeholder='Select Your Age' className='w-40 rounded-lg my-2 py-1.5 px-2 text-base outline-2 outline-gray-500 font-medium ' />
                    </div>
                </div>
                <h5 className='font-medium py-1 text-gray-700 mt-4'>Consent</h5>
                <div className='flex items-center gap-1'>
                    <input type="checkbox" className='w-12 h-12' />
                    <p className='text-sm font-normal'>I voluntarly consent to donate blood and agree to any necessary checks before donation.</p>
                </div>
                <button className='bg-red-800 text-white font-medium w-full py-2 px-1 rounded-lg mt-7'>Proceed to Donate</button>
            </form>

        </div>
    )
}

export default DonateBloodform